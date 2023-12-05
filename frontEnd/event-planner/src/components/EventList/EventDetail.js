import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getEvent } from "../../services/api";

const EventDetail = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            const data = await getEvent(eventId);
            setEvent(data);
        };

        fetchEvent();
    }, [eventId]);

    if (!event) {
        return <div>Loading...</div>;
    }

    const { eventName, eventDescription, startDate, endDate, recurrenceType } = event;

    const getNextOccurrences = (eventDate, numOccurrences) => {
        const nextOccurrences = [];
        const currentDate = new Date();

        const startDate = new Date(eventDate);

        let currentDateCopy = new Date(startDate);

        for (let i = 0; i < numOccurrences; i++) {
            currentDateCopy.setDate(currentDateCopy.getDate() + 1);
            while (currentDateCopy <= currentDate) {
                currentDateCopy.setDate(currentDateCopy.getDate() + 1);
            }
            nextOccurrences.push(currentDateCopy.toISOString().split('T')[0]);
        }

        return nextOccurrences;
    }

    const nextOccurrences = getNextOccurrences(startDate, 5);

    const eventStartDate = new Date(startDate).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const eventEndDate = endDate && new Date(endDate).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className='small-container'>
            <h2>Event Name : {eventName}</h2>
            <p>Description: {eventDescription}</p>
            <p>Start Date: {eventStartDate}</p>
            <p>End Date: {eventEndDate && eventEndDate}</p>
            <p>Recurrence Type: {recurrenceType}</p>

            <h3>Next 5 Occurrences:</h3>
            <ul>
                {nextOccurrences.map((occurrence, index) => (
                    <li key={index}>{occurrence}</li>
                ))}
            </ul>
        </div>
    );
};

export default EventDetail;
