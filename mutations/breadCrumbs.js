const BreadCrumb = require('../models/breadCrumb');

module.exports = {
  createBreadCrumb: async (root, args) => {
    const newBreadCrumb = { ...args };
    await BreadCrumb.save(newBreadCrumb) // mongodb mutates breadcrumb with _id before it inserts it
    return newBreadCrumb
  }
}