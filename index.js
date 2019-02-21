const { ApolloServer, gql } = require('apollo-server');
const { createBreadCrumb } = require('./mutations/breadCrumbs')
const { getBreadCrumbs } = require('./queries/breadCrumbs')

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  type BreadCrumb {
    _id: ID!
    element: String
    type: String
    value: String
  }

  type Query {
    breadCrumbs: [BreadCrumb]
  }

  type Mutation {
    createBreadCrumb(element: String!, type: String!, value: String): BreadCrumb
    updateBreadCrumb(id: ID!, element: String!, type: String!, value: String): BreadCrumb
    deleteBreadCrumb(id: ID!): BreadCrumb
  }

  type Subscription {
    newBreadCrumb: BreadCrumb
  }
`;

// Resolvers define the technique for fetching the types in the schema.
const resolvers = {
  Query: {
    breadCrumbs: getBreadCrumbs,
  },
  Mutation: {
    createBreadCrumb: createBreadCrumb
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});