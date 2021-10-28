const { ApolloServer, ApolloError } = require('apollo-server')
const SessionAPI = require('./datasources/sessions')
const SpeakerAPI = require('./datasources/speakers')

console.log('Here is:')
console.log(new SessionAPI().getSessionById(2))

// The GraphQL schema
const typeDefs = require('./schema.js')

// A map of functions which return data for the schema.
const resolvers = require('./resolvers')

const dataSources = () => {
  return {
    sessionAPI: new SessionAPI(),
    speakerAPI: new SpeakerAPI()
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  introspection: true, // set introspection to false to prevent its use in the Apollo Studio sandbox
  // can also add debug: false to prevent full stacktraces showing up with production errors (useful in dev though!)
  formatError: (err) => {
    if (err.extensions.code === 'INTERNAL_SERVER_ERROR') {
      return new ApolloError('We are having technical difficulties', 'ERROR', { token: 'uniqueToken' })
    }
  }
})

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`graphQL server running at ${url}`)
})
