const MongoClient = require('../mongo/client')

module.exports = {
  save: breadCrumb => MongoClient.save('breadCrumb', breadCrumb),
  all: () => MongoClient.all('breadCrumb')
}