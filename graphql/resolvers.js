const BreadCrumb = require('../models/breadCrumb');

function createResolvers(model = BreadCrumb) {
  return {
    Query: { breadCrumbs: () => model.all() },
    Mutation: { createBreadCrumb: (_root, args) => model.save({ ...args }) },
    BreadCrumb: { _id: breadcrumb => breadcrumb._id.toString() },
  };
}

module.exports = { resolvers: createResolvers(), createResolvers };
