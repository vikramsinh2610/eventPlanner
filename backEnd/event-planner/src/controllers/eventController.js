const Event = require('../models/Event');

// Create a new event
exports.createEvent = async (req, res) => {

    const existingEvent = await Event.findOne({ eventName: req.body.eventName });
    if (existingEvent) {
        return res.status(400).json({ msg: 'event already exists' });
    }

    const event = new Event({
        eventName: req.body.eventName,
        eventDescription: req.body.eventDescription,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        recurrenceType: req.body.recurrenceType
    });

    try {
        await event.save();
        res.json({ msg: 'Event registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Get All Events
exports.getAllEvent = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const events = await Event.find();

        const parsedStartDate = new Date(startDate);
        const parsedEndDate = new Date(endDate);

        if(parsedStartDate.getTime() === parsedEndDate.getTime()){
            const filteredEvents = events.filter((event) => {
                const eventstartDate = new Date(event.startDate);
                const eventEndDate = new Date(event.endDate);
                return eventstartDate.getDay() <= parsedEndDate.getDay() && eventEndDate.getDay() >= parsedStartDate.getDay();
            });
            res.status(200).json(filteredEvents);
        }else{
            const filteredEventss = events.filter((event) => {
                const eventstartDate = new Date(event.startDate);
                const eventEndDate = new Date(event.endDate);
                return eventstartDate.getTime() <= parsedEndDate.getTime() && eventEndDate.getTime() >= parsedStartDate.getTime();
            });
            res.status(200).json(filteredEventss);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Event by ID
exports.updateEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Event by ID
exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};