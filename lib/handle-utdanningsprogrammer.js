'use strict'

const { send } = require('micro')
const logger = require('./logger')

module.exports.utdanningsprogrammer = async (request, response) => {
  const utdanningsprogrammer = require('../data/utdanningsprogrammer.json')
  logger('info', ['handle-utdanningsprogrammer', 'utdanningsprogrammer'])
  send(response, 200, utdanningsprogrammer)
}

module.exports.utdanningsprogram = async (request, response) => {
  const { id } = request.params
  const filePath = `../data/${id.toLowerCase()}.json`
  logger('info', ['handle-utdanningsprogrammer', 'utdanningsprogram', 'id', id])
  try {
    const program = require(filePath)
    send(response, 200, program)
  } catch (error) {
    send(response, 404, error)
  }
}
