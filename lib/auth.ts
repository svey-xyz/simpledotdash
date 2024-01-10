import prisma from "@/lib/db";
import { User } from "@prisma/client";
import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"
import type { NextAuthOptions } from "next-auth"
import { getServerSession } from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import DiscordProvider from "next-auth/providers/discord";

async function getUser(email: string): Promise<User | null> {
	try {
		const user = await prisma.user.findUnique({
			where: { email:email }
		});
		return user;
	} catch (error) {
		console.error('Failed to fetch user:', error);
		throw new Error('Failed to fetch user.');
	}
}

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
	secret: process.env.NEXTAUTH_SECRET as string,
} satisfies NextAuthOptions

// Use it in server contexts
export function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
	return getServerSession(...args, config)
}