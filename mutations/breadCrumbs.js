const BreadCrumb = require('../models/breadCrumb');

module.exports = {
  createBreadCrumb: (_root, args) => BreadCrumb.save({ ...args }),
};
