const { createBreadCrumb } = require('../mutations/breadCrumbs')
const { getBreadCrumbs } = require('../queries/breadCrumbs')

// Resolvers define the technique for fetching the types in the schema.

module.exports = {
  resolvers: {
    Query: {
      breadCrumbs: getBreadCrumbs,
    },
    Mutation: {
      createBreadCrumb: createBreadCrumb
    }
  }
}