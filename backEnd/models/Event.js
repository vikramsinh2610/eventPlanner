const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 30 },
  description: String,
  startDate: Date,
  endDate: Date,
  recurrenceType: { type: String, required: true },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;