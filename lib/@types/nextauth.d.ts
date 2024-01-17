import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
	interface User {
		editing?: boolean;
	}

	interface Session extends DefaultSession {
		user?: User
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		editing?: boolean;
	}
}