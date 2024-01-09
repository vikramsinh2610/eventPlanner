import React, { useState } from 'react';
import { createEvents } from '../../services/api';

const CreateEvent = ({ onCreateEvent }) => {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [recurrenceType, setRecurrenceType] = useState('Single');

  const handleCreateEvent = async () => {
    // Validate form data
    if (!eventName || eventName.length > 30) {
      alert('Event name is required and must be 30 characters or less.');
      return;
    }

    if (!startDate || isNaN(new Date(startDate).getTime())) {
      alert('Start date is required and must be a valid date.');
      return;
    }

    if (endDate && isNaN(new Date(endDate).getTime())) {
      alert('End date must be a valid date.');
      return;
    }

    // Create the event object
    const newEvent = {
      name: eventName,
      description: eventDescription,
      startDate: startDate,
      endDate: endDate,
      recurrenceType: recurrenceType,
    };

    // var raw = JSON.stringify({
    //     "name": "my name vik",
    //     "description": "event",
    //     "startDate": "2023-10-26",
    //     "endDate": "2023-11-27",
    //     "recurrenceType": "Daily"
    //   });

    // Call the API to create the event
    await onCreateEvent(JSON.stringify(newEvent));

    // Reset form fields after creating the event
    // setEventName('');
    // setEventDescription('');
    // setStartDate('');
    // setEndDate('');
    // setRecurrenceType('Single');
  };

  return (
    <div>
      <h2>Create New Event</h2>
      <label>
        Event Name:
        <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} />
      </label>
      <br />
      <label>
        Event Description:
        <textarea value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} />
      </label>
      <br />
      <label>
        Start Date:
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </label>
      <br />
      <label>
        End Date (optional):
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </label>
      <br />
      <label>
        Recurrence Type:
        <select value={recurrenceType} onChange={(e) => setRecurrenceType(e.target.value)}>
          <option value="Single">Single</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>
      </label>
      <br />
      <button onClick={handleCreateEvent}>Create Event</button>
    </div>
  );
};

export default CreateEvent;
