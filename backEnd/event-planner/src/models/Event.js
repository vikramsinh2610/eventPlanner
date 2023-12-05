const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true, maxlength: 30 },
  eventDescription: String,
  startDate: Date,
  endDate: Date,
  recurrenceType: { type: String, required: true },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;