import React from 'react';

const EventFilter = ({ filter, setFilter }) => {
    return (
        <div style={{width: 150, float: 'right' }}>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="today">Today</option>
                <option value="thisWeek">This Week</option>
                <option value="thisMonth">This Month</option>
                <option value="thisYear">This Year</option>
            </select>
        </div>
    );
};

export default EventFilter;