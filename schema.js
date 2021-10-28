const { gql } = require('apollo-server')

module.exports = gql`
type Query {
    sessions(
      id: ID
      title: String
      description: String
      startsAt: String
      endsAt: String
      room: Room
      day: String
      format: String
      track: String @deprecated(reason: "Too many sessions do not fit into a single track")
      level: String
      ): [Session]
    sessionById(id: ID): SessionOrError
    speakers(name: String): [Speaker]
    speakerById(id: ID): Speaker
}
type Mutation {
  toggleFavoriteSession(id: ID): Session
  addNewSession(session: SessionInput): Session
}
union SessionOrError = Session | Error

input SessionInput {
  title: String,
  description: String,
  startsAt: String,
  endsAt: String,
  room: String,
  day: String,
  format: String,
  track: String @deprecated(reason: "Too many sessions do not fit into a single track"),
  level: String
  favorite: Boolean
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
  favorite: Boolean
  speakers: [Speaker]
}
type Speaker {
  id: ID!,
  bio: String,
  name: String,
  sessions: [Session]
}

type Error {
  code: String
  message: String
  token: String
}
enum Room {
  BEECH
  ELM
  OAK
  SYCAMORE
  BIRCH
  PINE
  REDWOOD
}
`
