const { ApolloServer, gql } = require('apollo-server')
const SessionAPI = require('./datasources/sessions')

console.log('Here is:')
console.log(new SessionAPI().getSessionById(2))

// The GraphQL schema
const typeDefs = require('./schema.js')

// A map of functions which return data for the schema.
const resolvers = require('./resolvers')

const dataSources = () => {
  return {
    sessionAPI: new SessionAPI()
  }
}

const server = new ApolloServer({
  typeDefs, resolvers, dataSources, introspection: true // set introspection to false to prevent its use in the Apollo Studio sandbox
})

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`graphQL server running at ${url}`)
})
