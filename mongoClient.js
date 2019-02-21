const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
const options = { useNewUrlParser: true }
const dbName = 'test'

module.exports = {
  save: (collection, document) => (new Promise((resolve, reject) => {
    MongoClient.connect(url, options, (err, client) => {
      if (err) reject(err)

      client.db(dbName).collection(collection).insertOne(
        document,
        {/*options*/},
        (err, doc) => {
          if (err) reject(err)
          resolve(doc.ops)
          client.close()
        }
      )
    })
  })
  ),
  all: collection => (new Promise((resolve, reject) => {
      MongoClient.connect(url, options, (err, client) => {
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