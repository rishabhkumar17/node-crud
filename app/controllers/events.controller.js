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
    	res.render('pages/single', { event: event })
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

module.exports = {
    showEvents: showEvents,
    showSingle: showSingle,
    seedEvents: seedEvents
}