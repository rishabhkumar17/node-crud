// grab our dependencies
const express = require('express'),
	app = express(),
	port = process.env.PORT || 8080,
	expressLayouts = require('express-ejs-layouts')
	mongoose = require('mongoose')
	dotenv = require('dotenv')
	bodyParser = require('body-parser')
	session = require('express-session')
	cookieParser = require('cookie-parser')
	flash = require('connect-flash')
	expressValidator = require("express-validator")

 // config environment variable
dotenv.config()

// configure our application
// set sessions and cookie parser
app.use(cookieParser())
app.use(session({
	secret: `${process.env.SECRET}`,
	cookie: { maxAge: 60000 },
	resave: false, // forces the session to be saved back to the store
	saveUninitialized: false // don't save unmodified
}))
app.use(flash())

// tell express where to look for static assets
app.use(express.static(__dirname + '/public'))

// set ejs as out templating engine
app.set('view engine', 'ejs')
app.use(expressLayouts)

// connect to database
mongoose.set('strictQuery', false)
mongoose.connect(
	process.env.DB_CONNECT, 
	() => console.log('Connected to DB')
)

// use body parser to grab info from a form
app.use(bodyParser.urlencoded({ extended: true }))
//express validator
app.use(expressValidator())

// set the routes	
app.use(require('./app/routes'))

// start our server
app.listen(port, () => {
	console.log(`App listening on http://localhost:${port}`)
}) 