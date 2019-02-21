const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
const dbName = 'test'

module.exports = {
  save: (collection, document) => {
    MongoClient.connect(url, (err, client) => {
      if (err) throw err

      client.db(dbName).collection(collection).insertOne(document)
      client.close()
    })
  },
  all: collection => (new Promise((resolve, reject) => {
      MongoClient.connect(url, (err, client) => {
        if (err) reject(err)

        client.db(dbName).collection(collection).find().toArray((err, docs) => {
          if (err) reject(err)
          resolve(docs)
          client.close()
        })
      })
    })
  ),
}