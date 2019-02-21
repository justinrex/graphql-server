const { gql } = require('apollo-server');

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.

module.exports = {
  typeDefs: gql`
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
  `
}