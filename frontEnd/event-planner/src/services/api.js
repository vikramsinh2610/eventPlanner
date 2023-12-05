const baseURL = "http://localhost:3000";

var myHeaders = new Headers();
myHeaders.append("x-auth-token", localStorage.getItem('token'));
myHeaders.append("Content-Type", "application/json");

export const getEvents = async (filter) => {

  let filterUrl = '';

  if (filter === 'today') {
    filterUrl += `?startDate=${new Date().toISOString()}&endDate=${new Date().toISOString()}`;
  } else if (filter === 'thisWeek') {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();

    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - currentDay);

    const endDate = new Date(currentDate);
    endDate.setDate(currentDate.getDate() + (6 - currentDay));

    filterUrl += `?startDate=${new Date(startDate).toISOString().split('T')[0]}&endDate=${new Date(endDate).toISOString().split('T')[0]}`;
  } else if (filter === 'thisMonth') {
    const currentDate = new Date();

    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString().split('T')[0];

    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).toISOString().split('T')[0];

    filterUrl += `?startDate=${startDate}&endDate=${endDate}`;

  } else if (filter === 'thisYear') {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), 0, 1).toISOString().split('T')[0];
    const endDate = new Date(currentDate.getFullYear(), 11, 31).toISOString().split('T')[0];
    filterUrl += `?startDate=${startDate}&endDate=${endDate}`;
  }

  const response = await fetch(`${baseURL}/event/list${filterUrl}`, { method: 'GET', headers: myHeaders });
  const data = await response.json();
  return data;
};

export const getEvent = async (eventId) => {
  const response = await fetch(`${baseURL}/event/${eventId}`, { method: 'GET', headers: myHeaders });
  const data = await response.json();
  return data;
};

export const createUser = async (usersData) => {
  const response = await fetch(`${baseURL}/auth/register`, { method: 'POST', headers: myHeaders, body: usersData });
  const data = await response.json();
  return data;
}

export const createEvents = async (events) => {
  const response = await fetch(`${baseURL}/event/create`, { method: 'POST', headers: myHeaders, body: events });
  const data = await response.json();
  return data;
}

export const EditEvent = async (event,eventId) => {
  const response = await fetch(`${baseURL}/event/update/${eventId}`, { method: 'PUT', headers: myHeaders, body: event });
  const data = await response.json();
  return data;
}

export const deleteEvent = async (eventId) => {
  await fetch(`${baseURL}/event/delete/${eventId}`, { method: 'DELETE', headers: myHeaders });
};
