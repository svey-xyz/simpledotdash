import { app } from "@lib/data.schema";
import NextAuth, { DefaultSession } from "next-auth"
import type { UserWithObjects } from '@lib/db'
import { Session } from "inspector";

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
		id?: string;
	}
}