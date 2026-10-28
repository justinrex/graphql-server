const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { resolvers } = require('./graphql/resolvers');
const { typeDefs } = require('./graphql/typeDefs');

function createServer(options = {}) {
  return new ApolloServer({ typeDefs, resolvers, ...options });
}

if (require.main === module) {
  startStandaloneServer(createServer(), {
    listen: { port: Number(process.env.PORT || 4000), host: '127.0.0.1' },
  }).then(({ url }) => console.log(`Server ready at ${url}`)).catch(error => {
    console.error(error.message);
    process.exitCode = 1;
  });
}

module.exports = { createServer };
