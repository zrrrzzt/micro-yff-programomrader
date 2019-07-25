'use strict'

const logger = require('../lib/logger')

module.exports = async (request, response) => {
  const utdanningsprogrammer = require('../data/utdanningsprogrammer.json')
  logger('info', ['handle-utdanningsprogrammer', 'utdanningsprogrammer'])
  response.json(utdanningsprogrammer)
}
