const mongoose = require('mongoose')
		Schema = mongoose.Schema

// create a schema
const eventSchema = new Schema({
	name: String,
	slug: {
		type: String,
		unique: true
	},
	description: String
})

// middleware
eventSchema.pre('save', function(next) {
	this.slug = slugify(this.name)
	next()
})

// create the model
const eventModel = mongoose.model('Event', eventSchema)

// export the model
module.exports = eventModel

function slugify(text) {
	return 
}