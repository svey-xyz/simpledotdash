import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"
import type { NextAuthOptions, Profile } from "next-auth"
import { getServerSession } from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import DiscordProvider from "next-auth/providers/discord";
import prisma from "@lib/db";
import { Prisma, PrismaClient } from "@prisma/client"
import { Adapter, AdapterAccount } from "next-auth/adapters";
import { OAuthConfig } from "next-auth/providers/oauth";

const genProviders = () => {
	const providers: Array<OAuthConfig<Profile>> = []

	if (process.env.GITHUB_ID && process.env.GITHUB_SECRET)
		providers.push(
			GitHubProvider({
				clientId: process.env.GITHUB_ID as string,
				clientSecret: process.env.GITHUB_SECRET as string,
			})
		)

	if (process.env.DISCORD_CLIENT_ID && process.env.DISCORD_CLIENT_SECRET)
		providers.push(
			DiscordProvider({
				clientId: process.env.DISCORD_CLIENT_ID as string,
				clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
			})
		)

	return providers
}

export const _PROVIDERS = genProviders()

export const config = {
	// Configure one or more authentication providers
	session: {
		strategy: 'database'
	},
	providers: _PROVIDERS,
	adapter: PrismaAdapter(prisma),
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			return user ? true : false
		},
		async redirect({ url, baseUrl }) {
			if (url.startsWith(baseUrl)) return url
			if (url.startsWith('/')) return new URL(url, baseUrl).toString()
			return baseUrl
		},
		async jwt({ token, user, trigger, session, account }) {
			/* Step 1: update the token based on the user object */
			if (trigger === "update" && session?.editing) {
				// Note, that `session` can be any arbitrary object, remember to validate it!
				token.editing = session.editing
			}
			if (account) {
				token.id = account.userId
			}
			if (user) {
				token.editing = user.editing;
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token, user, trigger, newSession }) {
			// Send properties to the client, like an access_token and user id from a provider.
			if (token && session.user) {
				session.user.editing = token.editing;
				session.user.id = token.id;
			}

			if (user) {
				session.user.id = user.id
			}

			// Note, that `rest.session` can be any arbitrary object, remember to validate it!
			if (trigger === "update" && newSession?.editing) {
				// You can update the session in the database if it's not already updated.
				// await adapter.updateUser(session.user.id, { name: newSession.name })

				// Make sure the updated value is reflected on the client
				session.user.editing = newSession.editing
			}

			return session
		},
	},
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

