import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"
import type { NextAuthOptions } from "next-auth"
import { getServerSession } from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import DiscordProvider from "next-auth/providers/discord";
import prisma from "@lib/db";
import { Prisma, PrismaClient } from "@prisma/client"
import { Adapter, AdapterAccount } from "next-auth/adapters";

export const config = {
	// Configure one or more authentication providers
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
		}),
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID as string,
			clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
		}),
	],
	adapter: PrismaAdapter(prisma),
	secret: process.env.NEXTAUTH_SECRET as string,
} satisfies NextAuthOptions

// Use it in server contexts
export function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
	return getServerSession(...args, config)
}

function PrismaAdapter(p: PrismaClient): Adapter {
	return {
		createUser: (data) => p.user.create({ data }),

		getUser: (id) => p.user.findUnique({ where: { id } }),

		getUserByEmail: (email) => p.user.findUnique({ where: { email } }),

		async getUserByAccount(provider) {
			const account = await p.account.findUnique({
				where: { provider_providerAccountId: {
					provider: provider.provider,
					providerAccountId: provider.providerAccountId
				}},
				select: { user: true },
			})
			return account?.user ?? null
		},

		updateUser: ({ id, ...data }) => p.user.update({ where: { id }, data }),

		deleteUser: (id) => p.user.delete({ where: { id } }),

		linkAccount: (account) => {
			return p.account.create({ data: account }) as unknown as AdapterAccount
		},

		unlinkAccount: (provider) =>
			p.account.delete({
				where: {
					provider_providerAccountId: {
						provider: provider.provider,
						providerAccountId: provider.providerAccountId
					}
				},
			}) as unknown as AdapterAccount,

		async getSessionAndUser(sessionToken) {
			const userAndSession = await p.session.findUnique({
				where: { sessionToken },
				include: { user: true },
			})
			if (!userAndSession) return null
			const { user, ...session } = userAndSession
			return { user, session }
		},

		createSession: (session) => {
			return p.session.create({ data: session })
		},

		updateSession: (data) =>
			p.session.update({ where: { sessionToken: data.sessionToken }, data }),

		deleteSession: (sessionToken) =>
			p.session.delete({ where: { sessionToken } }),

		async createVerificationToken(data) {
			const verificationToken = await p.verificationToken.create({ data })
			if (verificationToken.identifier) delete verificationToken.identifier
			return verificationToken
		},

		async useVerificationToken(identifier_token) {
			try {
				const verificationToken = await p.verificationToken.delete({
					where: { identifier_token },
				})

				if (verificationToken.identifier) delete verificationToken.identifier
				return verificationToken
			} catch (error) {
				// If token already used/deleted, just return null
				// https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
				if ((error as Prisma.PrismaClientKnownRequestError).code === "P2025")
					return null
				throw error
			}
		},
	}
}

