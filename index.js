// Packages
const Router = require('router')
const finalhandler = require('finalhandler')
const cors = require('cors')

// Utilities
const handlers = require('./lib/handlers')
const handleUtdanningsprogrammer = require('./lib/handle-utdanningsprogrammer')

// Initialize a new router
const router = Router()

// CORS
router.use(cors())

// ROUTES
router.get('/', handlers.frontpage)
router.get('/utdanningsprogrammer', handleUtdanningsprogrammer.utdanningsprogrammer)
router.get('/utdanningsprogrammer/:id', handleUtdanningsprogrammer.utdanningsprogram)

module.exports = (request, response) => {
  router(request, response, finalhandler(request, response))
}
