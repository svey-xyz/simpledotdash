import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import gql from 'graphql-tag';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const typeDefs = gql`type User {
	id: ID
	name: String
	email: String
	# emailVerified: DateTime
	image: String
	# createdAt: DateTime
	# updatedAt: DateTime
	# sessions: [Session]
	apps: [App]
}

type App {
  id: ID
  # taxonomies: [taxonomies]
  description: String
  title: String
  url: String
}

type Settings {
	id: ID
	title: String
}

type Query {
	allUsers: [User!]!
	user(id: ID!): User!
	settings: Settings!
}
`
// import typeDefs from './schemas/User.gql'
// import { resolvers } from './resolvers/resolver'
const resolvers = {
	Query: {
		settings: () => {
			return prisma.settings.findFirst()
		},
	},
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

const { url } = await startStandaloneServer(server);