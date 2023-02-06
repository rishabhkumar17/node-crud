// create a new express router
const router = require('express').Router(),
	mainController = require('./controllers/main.controller')
	
// export router
module.exports = router

// define router
router.get('/', mainController.showHome)