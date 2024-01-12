import { PrismaClient } from '@prisma/client';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';

import UserType from './schemas/User'

const prisma = new PrismaClient();

const resolvers = {
	Query: {
		allUsers: () => {
			return prisma.user.findMany();
		}
	}
};

export const schema = makeExecutableSchema({
	resolvers,
	typeDefs: UserType,
});

const app = express();
app.use('/graphql', graphqlHTTP({
	schema,
}));

app.listen(4000);