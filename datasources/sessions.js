const sessions = require('../data/sessions.json')
const { DataSource } = require('apollo-datasource')
const _ = require('lodash')

class SessionAPI extends DataSource {
  // eslint-disable-next-line no-useless-constructor
  constructor () {
    super()
  }

  initialize (config) {

  }

  getSessions (args) {
    return _.filter(sessions, args)
  }

  getSessionById (id) {
    const filteredSessions = sessions.filter((session) => session.id === parseInt(id))
    return filteredSessions[0]
  }
}

module.exports = SessionAPI
