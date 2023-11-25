const Event = require('../models/Event');

// Create a new event
exports.createEvent = async (req, res) => {

    const existingEvent = await Event.findOne({ name: req.body.name });
    if (existingEvent) {
      return res.status(400).json({ msg: 'event already exists' });
    }
  
    const event = new Event({
      name: req.body.name,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      recurrenceType: req.body.recurrenceType
    });
  
    // Save the event to the database
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
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }    
};

// Get Event by ID
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