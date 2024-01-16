import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"
import type { Account, NextAuthOptions, Profile, User as authUser} from "next-auth"
import { getServerSession } from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import DiscordProvider from "next-auth/providers/discord";
import prisma from "@lib/db";
import { User, App } from "@prisma/client"
// import { User } from "@prisma/client";

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`

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
	events: {
		signIn: async({
			user,
			account,
			profile,
			isNewUser
		}: {
			user: authUser;
			account: Account;
			profile?: Profile;
			isNewUser?: boolean;
		}) => {
			const userData = {
				email: user.email,
				name: user.name,
				image: user.image,
			}

			const existingUser = await prisma.user.findUnique({
				where: {
					email: userData.email
				},
				include: {
					sessions: true,
					accounts: true
				}
			})

			if (existingUser) {
				// existingUser.accounts
				let newAccount: boolean = true
				if (existingUser.accounts.length == 0) newAccount = false
				if (newAccount) existingUser.accounts.forEach((userAccount) => {
					if ((userAccount.provider == account.provider)
						&& (userAccount.providerAccountId == account.providerAccountId)) {
						newAccount = false
					}
				})

				if (!newAccount) {
					const updatedUser = await prisma.user.update({
						where: {
							email: existingUser.email
						},
						data: {
							accounts: {
								create: {
									...account
								}
							}
						}
					})
				}
				console.log('user found')

			}

			if (!existingUser) {
				const newUser = await prisma.user.create({
					data: {
						...userData,
						accounts: {
							create: {
								...account
							}
						}
					}
				})
				console.log('account created: ', newUser)

			} 
		},
	},
	secret: process.env.NEXTAUTH_SECRET as string,
} satisfies NextAuthOptions

// Use it in server contexts
export function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
	return getServerSession(...args, config)
}