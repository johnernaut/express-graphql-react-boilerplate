const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

const typeDefs = `
    type Link {
        id: ID!
        url: String!
        description: String!
    }

    type User {
        name: String!
        email: String!
        jwt: String
    }

    type Query {
        allLinks: [Link!]!
        currentUser: User
    }

    type Mutation {
        createLink(url: String!, description: String!): Link
        login(email: String!, password: String!): User
        signup(name: String!, email: String!, password: String!, password_confirmation: String!): User
    }
`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });
