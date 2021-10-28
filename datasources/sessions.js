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

  toggleFavoriteSession (id) {
    const filteredSessions = sessions.filter((session) => session.id === parseInt(id))
    filteredSessions[0].favorite = !filteredSessions[0].favorite
    return filteredSessions[0]
  }

  addNewSession (session) {
    console.log(typeof sessions) // even though we require() json file, it's imported as a JS object type
    session.id = 12 // hard-coding for now
    sessions.push(session)
    console.log(session)
    return session
  }
}

module.exports = SessionAPI
