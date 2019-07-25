'use strict'

const logger = require('../lib/logger')

function getParams (path) {
  const list = path.split('/')
  return {
    id: list.pop()
  }
}

module.exports = async (request, response) => {
  const params = getParams(request.url)
  const { id } = params
  logger('info', ['utdanningsprogram', 'id', id])
  try {
    const program = require(`../data/${id.toLowerCase()}.json`)
    response.json(program)
  } catch (error) {
    logger('error', ['utdanningsprogram', 'id', id, error])
    response.status(404)
    response.send(error)
  }
}
