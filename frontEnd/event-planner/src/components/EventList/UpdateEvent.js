import React, { useState, useEffect } from 'react';
import { getEvent, EditEvent } from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateEvent = () => {
    const navigate = useNavigate();

    const [eventData, setEventData] = useState();
    const { eventId } = useParams();

    useEffect(() => {
        const fetchEvent = async () => {
            const data = await getEvent(eventId);
            setEventData(data);
        };

        fetchEvent();
    }, [eventId]);

    const [errors, setErrors] = useState({});

    const handleEditEvent = async () => {

        const validationErrors = {};
        if (!eventData?.eventName || eventData?.eventName.length > 30) {
            validationErrors.eventName = 'Event name is required and must be 30 characters or less.';
        }

        if (!eventData?.startDate || isNaN(new Date(eventData?.startDate).getTime())) {
            validationErrors.startDate = 'Start date is required and must be a valid date.';
        }

        if (eventData?.endDate && isNaN(new Date(eventData?.endDate).getTime())) {
            validationErrors.endDate = 'End date must be a valid date.';
        }

        if (!eventData?.recurrenceType) {
            validationErrors.recurrenceType = 'recurrenceType is required.';
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            const newEvent = {
                eventName: eventData?.eventName,
                eventDescription: eventData?.eventDescription,
                startDate: eventData?.startDate,
                endDate: eventData?.endDate,
                recurrenceType: eventData?.recurrenceType,
            };

            try {
                const res = await EditEvent(JSON.stringify(newEvent), eventId);
                if (res) {

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
            <h2>Edit Event</h2>
            {eventData && (
                <>
                    <label>
                        Event Name:
                        <input type="text" value={eventData?.eventName} onChange={(e) => setEventData({ ...eventData, eventName: e.target.value })} />
                        {errors.eventName && <p className="error">{errors.eventName}</p>}
                    </label>
                    <br />
                    <label>
                        Event Description:
                        <textarea value={eventData?.eventDescription} onChange={(e) => setEventData({ ...eventData, eventDescription: e.target.value })} />
                    </label>
                    <br />
                    <label>
                        Start Date:
                        <input type="date" value={eventData?.startDate} onChange={(e) => setEventData({ ...eventData, startDate: e.target.value })} />
                        {errors.startDate && <p className="error">{errors.startDate}</p>}
                    </label>
                    <br />
                    <label>
                        End Date (optional):
                        <input type="date" value={eventData?.endDate} onChange={(e) => setEventData({ ...eventData, endDate: e.target.value })} />
                        {errors.endDate && <p className="error">{errors.endDate}</p>}
                    </label>
                    <br />
                    <label>
                        Recurrence Type:
                        <select value={eventData?.recurrenceType} onChange={(e) => setEventData({ ...eventData, recurrenceType: e.target.value })}>
                            <option value="Single">Single</option>
                            <option value="Daily">Daily</option>
                            <option value="Weekly">Weekly</option>
                            <option value="Monthly">Monthly</option>
                            <option value="Yearly">Yearly</option>
                        </select>
                        {errors.recurrenceType && <p className="error">{errors.recurrenceType}</p>}
                    </label>
                    <br />
                    <button onClick={handleEditEvent}>Edit Event</button>
                </>
            )}

        </div>
    );
};

export default UpdateEvent;
