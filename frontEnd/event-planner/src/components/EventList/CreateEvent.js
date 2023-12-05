import React, { useState } from 'react';
import { createEvents } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [recurrenceType, setRecurrenceType] = useState('Single');

  const [errors, setErrors] = useState({});

  const handleCreateEvent = async () => {

    const validationErrors = {};
    if (!eventName || eventName.length > 30) {
      validationErrors.eventName = 'Event name is required and must be 30 characters or less.';
    }

    if (!startDate || isNaN(new Date(startDate).getTime())) {
      validationErrors.startDate = 'Start date is required and must be a valid date.';
    }

    if (endDate && isNaN(new Date(endDate).getTime())) {
      validationErrors.endDate = 'End date must be a valid date.';
    }

    if (!recurrenceType) {
      validationErrors.recurrenceType = 'recurrenceType is required.';
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const newEvent = {
        eventName: eventName,
        eventDescription: eventDescription,
        startDate: startDate,
        endDate: endDate,
        recurrenceType: recurrenceType,
      };

      try {
        const res = await createEvents(JSON.stringify(newEvent));
        if (res) {
          setEventName('');
          setEventDescription('');
          setStartDate('');
          setEndDate('');
          setRecurrenceType('Single');

          Swal.fire({
            timer: 1500,
            showConfirmButton: false,
            willOpen: () => {
              Swal.showLoading();
            },
            willClose: () => {
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: res.msg,
                showConfirmButton: false,
                timer: 1500,
              });
              navigate('/eventlist');
            },
          });

        }
      } catch (error) {
        console.error('API Error:', error);
      }
    }
  };

  return (
    <div className='small-container'>
      <h2>Create New Event</h2>
      <label>
        Event Name:
        <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} />
        {errors.eventName && <p className="error">{errors.eventName}</p>}
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
        {errors.startDate && <p className="error">{errors.startDate}</p>}
      </label>
      <br />
      <label>
        End Date (optional):
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        {errors.endDate && <p className="error">{errors.endDate}</p>}
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
        {errors.recurrenceType && <p className="error">{errors.recurrenceType}</p>}
      </label>
      <br />
      <button onClick={handleCreateEvent}>Create Event</button>
    </div>
  );
};

export default CreateEvent;
