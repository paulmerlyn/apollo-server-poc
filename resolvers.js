const _ = require('lodash')

module.exports = {
  Query: {
    sessions: (parent, args, { dataSources }, info) => {
      return dataSources.sessionAPI.getSessions(args)
    },
    sessionById: (parent, { id }, { dataSources }, info) => {
      return dataSources.sessionAPI.getSessionById(id)
    },
    speakers: (parent, args, { dataSources }, info) => {
      return dataSources.speakerAPI.getSpeakers()
    },
    speakerById: (parent, { id }, { dataSources }, info) => {
      return dataSources.speakerAPI.getSpeakerById(id)
    }
  },
  Mutation: {
    toggleFavoriteSession: (parent, { id }, { dataSources }, info) => {
      return dataSources.sessionAPI.toggleFavoriteSession(id)
    }
  },
  Session: {
    async speakers (session, args, { dataSources }) {
      const speakers = await dataSources.speakerAPI.getSpeakers()
      const returns = speakers.filter((speaker) => {
        return _.filter(session.speakers, { id: speaker.id }).length > 0
      })
      return returns
    }
  }
}
