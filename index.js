const { ApolloServer, gql } = require('apollo-server');
const BreadCrumb = require('./breadCrumbModel');

let tempguid = 0;

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  type BreadCrumb {
    id: ID!
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

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    breadCrumbs: () => BreadCrumb.all(),
  },
  Mutation: {
    createBreadCrumb: (root, args) => {
      const newBreadCrumb = { id: tempguid++, ...args};
      BreadCrumb.save(newBreadCrumb)
      return newBreadCrumb
    }
  }
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({
  typeDefs,
  resolvers
});

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});