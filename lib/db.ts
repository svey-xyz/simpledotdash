import { PrismaClient, Prisma } from '@prisma/server/data.schema'

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma;

const userWithObjects = Prisma.validator<Prisma.UserDefaultArgs>()({
	include: { apps: true, machines: true, sessions: true, accounts: true },
})

export type UserWithObjects = Prisma.UserGetPayload<typeof userWithObjects>
