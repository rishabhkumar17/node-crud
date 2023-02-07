// create a new express router
const router = require('express').Router(),
	mainController = require('./controllers/main.controller')
	eventsController = require('./controllers/events.controller')
	
// export router
module.exports = router

// define routes
// main routes
router.get('/', mainController.showHome)

// event routes
router.get('/events', eventsController.showEvents)