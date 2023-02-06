// create a new express router
const router = require('express').Router()

// export router
module.exports = router

// define router
router.get('/', (req, res) => {
	res.send('Hello, I am rout')
})