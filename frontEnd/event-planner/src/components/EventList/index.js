import React, { useState, useEffect } from 'react';
import EventFilter from './EventFilter';
import EventListItem from './EventListItem';
import { getEvents, deleteEvent } from '../../services/api';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const EventList = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('today');

  useEffect(() => {
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
      text: "Are you sure, you want to remove this event?",
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
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

  const ShowDetail = (eventId) => {
    navigate(`/detail/${eventId}`);
  }

  const handleLogout = () => {
    Swal.fire({
      icon: 'question',
      title: 'Logging Out',
      text: 'Are you sure you want to log out?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then(result => {
      if (result.value) {
        Swal.fire({
          timer: 1500,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            localStorage.removeItem('token');
            navigate(`/register`);
          },
        });
      }
    });
  };

  return (
    <div className='container'>
      <h1>Event List Page</h1>
      <button onClick={() => window.location.href = '/create'}>Create Event</button><button onClick={() => handleLogout()} style={{ float: 'right', background: '#f27474', marginLeft: '5px' }}>logout</button>
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
                <th colSpan={3} className="text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, i) => (
                <EventListItem
                  key={i}
                  event={event}
                  onDelete={() => handleDeleteEvent(event?._id)}
                  onShow={() => ShowDetail(event?._id)}
                  onEdit={() => window.location.href = `/edit/${event?._id}`}
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
