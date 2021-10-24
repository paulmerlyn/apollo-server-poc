const { ApolloServer, gql } = require('apollo-server')
const SessionAPI = require('./datasources/sessions')

console.log('Here is:')
console.log(new SessionAPI().getSessionById(2))

// The GraphQL schema
const typeDefs = gql`
    type Query {
        sessions(
          id: ID,
          title: String,
          description: String,
          startsAt: String,
          endsAt: String,
          room: String,
          day: String,
          format: String,
          track: String @deprecated(reason: "Too many sessions do not fit into a single track"),
          level: String
          ): [Session],
        sessionById(id: ID): Session
    }
    type Session {
      id: ID,
      title: String,
      description: String,
      startsAt: String,
      endsAt: String,
      room: String,
      day: String,
      format: String,
      track: String @deprecated(reason: "Too many sessions do not fit into a single track"),
      level: String
  }
`

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    sessions: (parent, args, { dataSources }, info) => {
      return dataSources.sessionAPI.getSessions(args)
    },
    sessionById: (parent, { id }, { dataSources }, info) => {
      return dataSources.sessionAPI.getSessionById(id)
    }
  }
}

const dataSources = () => {
  return {
    sessionAPI: new SessionAPI()
  }
}

const server = new ApolloServer({
  typeDefs, resolvers, dataSources
})

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`graphQL server running at ${url}`)
})
