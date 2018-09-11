const { readFile } = require('fs').promises
const md = require('markdown-it')()
const { send } = require('micro')
const logger = require('./logger')

exports.frontpage = async (request, response) => {
  logger('info', ['handlers', 'frontpage'])
  const readme = await readFile('README.md', 'utf-8')
  send(response, 200, md.render(readme))
}
