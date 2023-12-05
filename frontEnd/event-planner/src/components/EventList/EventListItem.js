import React from 'react';

const EventListItem = ({ event, onDelete, onShow, onEdit }) => {
    const startDate = new Date(event.startDate).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const endDate = new Date(event.endDate).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <tr key={event?._id}>
            <td>{event?.eventName}</td>
            <td>{event?.eventDescription}</td>
            <td>{event?.recurrenceType}</td>
            <td>{startDate}</td>
            <td>{endDate}</td>
            <td className="text-right">
                <button
                    onClick={onShow}
                    className="button muted-button"
                >
                    Show
                </button>
            </td>
            <td className="text-right">
                <button
                    onClick={onEdit}
                    className="button muted-button"
                >
                    Edit
                </button>
            </td>
            <td className="text-left">
                <button
                    onClick={onDelete}
                    className="button muted-button"
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default EventListItem;