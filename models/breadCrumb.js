const MongoClient = require('../mongoClient')

module.exports = {
  save: breadCrumb => MongoClient.save('breadCrumb', breadCrumb),
  all: () => MongoClient.all('breadCrumb')
}