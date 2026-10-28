const { MongoClient } = require('mongodb');

function createStore(clientFactory = () => new MongoClient(
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017',
  { serverSelectionTimeoutMS: 5000 },
)) {
  async function withCollection(name, operation) {
    const client = clientFactory();
    try {
      await client.connect();
      return await operation(client.db(process.env.MONGODB_DATABASE || 'breadcrumbs').collection(name));
    } finally {
      await client.close();
    }
  }

  return {
    save: (name, document) => withCollection(name, async collection => {
      const { insertedId } = await collection.insertOne(document);
      return { ...document, _id: insertedId };
    }),
    all: name => withCollection(name, collection => collection.find().toArray()),
  };
}

module.exports = { ...createStore(), createStore };
