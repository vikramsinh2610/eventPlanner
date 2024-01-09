import React, { useState, useEffect } from 'react';
import EventFilter from './EventFilter';
import EventListItem from './EventListItem';
import { getEvents, deleteEvent } from '../../services/api';
import Swal from 'sweetalert2';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('Daily');

  useEffect(() => {
    // Fetch events from the API based on the selected filter
    const fetchEvents = async () => {
      const data = await getEvents(filter);
      setEvents(data);
    };

    fetchEvents();
  }, [filter]);

  const handleDeleteEvent = async (eventId) => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(async result => {
      if (result.value) {
        await deleteEvent(eventId);
        const data = await getEvents(filter);
        setEvents(data);

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className='container'>
      <h1>Event List Page</h1>
      <button onClick={() => window.location.href = '/screen3'}>Create Event</button>
      <EventFilter filter={filter} setFilter={setFilter} />
      {events && events.length > 0 ? (<div>
        <div className="contain-table">
          <table className="striped-table">
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Description</th>
                <th>Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th colSpan={2} className="text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, i) => (
                <EventListItem
                  key={i}
                  event={event}
                  onDelete={() => handleDeleteEvent(event._id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>) : (<div>No Events</div>)}
    </div>
  );
};

export default EventList;
