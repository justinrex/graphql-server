const BreadCrumb = require('../models/breadCrumb');

module.exports = {
  getBreadCrumbs: () => BreadCrumb.all()
}