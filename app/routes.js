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

// seed events
router.get('/events/seed', eventsController.seedEvents)

// create events
router.get('/events/create', eventsController.showCreate)
router.post('/events/create', eventsController.processCreate)


// show a single event
router.get('/events/:slug', eventsController.showSingle)
