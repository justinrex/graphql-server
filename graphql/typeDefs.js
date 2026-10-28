module.exports = {
  typeDefs: `
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
    }
  `,
};
