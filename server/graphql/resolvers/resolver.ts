import { prisma } from "../../../lib/db"

export const resolvers = {
	Query: {
		settings: () => {
			return prisma.settings.findFirst()
		},
	},
}