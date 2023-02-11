const Event = require('../models/event')

// show all events
const showEvents = (req, res) => {
    // get all events
    Event.find({}, (err, events) => {
    	if(err) {
    		res.status(404).send('Events not found!')
    	}

    	//return a view with data
    	res.render('pages/events', { events: events })
    })
};

// show a single event
const showSingle = (req, res) => {
    // get a single event
    Event.findOne({ slug: req.params.slug }, (err, event) => {
    	if(err) {
    		res.status(404).send('Event not found!')
    	}
    	res.render('pages/single', 
            { event: event, success: req.flash('success') })
    })

    
};

// seed our databasse 
const seedEvents = (req, res) => {
    // create some events 
    const events = [{
            name: 'Basketball',
            description: 'Throwing into a basket.'
        },
        {
            name: 'Swimming',
            description: 'Michael Phelps is the fast fish.'
        },
        {
            name: 'Weightlifting',
            description: 'Lifting heavy things up.'
        },
        {
            name: 'Ping Pong',
            description: 'Super fast paddles'
        },
    ]

    // use the event model to insert/save
    Event.remove({}, () => {
        for (event of events) {
            var newEvent = new Event(event)
            newEvent.save()
        }
    })

    // seeded
    res.send('Database seeded!')
}

// show the create form
const showCreate = (req, res) => {
	res.render('pages/create', {
        errors: req.flash('errors')
    })
}


// process the creation form
const processCreate = (req, res) => {
    // validate information
    req.checkBody('name', 'Name is required').notEmpty()
    req.checkBody('description', 'Description is required').notEmpty()

    // if there are errors, redirect and save errors to flash
    const errors = req.validationErrors()
    if(errors) {
        req.flash('errors', errors.map(err => err.msg))
        return res.redirect('/events/create')
    }
	// create a new event
	const event = new Event({
		name: req.body.name,
		description: req.body.description
	})
	event.save((err) => {
		if(err) {
			throw err
		}

        // set a successful flash message
        req.flash('success', 'Successfuly created event!')

		// redirect to newly created event
		res.redirect(`/events/${event.slug}`)
	})
}

module.exports = {
    showEvents,
    showSingle,
    seedEvents,
    showCreate,
    processCreate
}