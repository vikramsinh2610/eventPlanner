const baseURL = "http://localhost:3000";

var myHeaders = new Headers();
myHeaders.append("x-auth-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTY2MjI1ZjgxNmU5NDcwNWY3M2MwN2QiLCJpYXQiOjE3MDE2MTk0NjIsImV4cCI6MTcwMTYyMzA2Mn0._htOh5mz91EloKGBUowGig9WH1nqt64aVkDobkB0-zg");
myHeaders.append("Content-Type", "application/json");

export const getEvents = async (filter) => {
    const response = await fetch(`${baseURL}/event/list?recurrenceType=${filter}`,{ method: 'GET', headers: myHeaders });
    const data = await response.json();
    console.log("Hello",data);
    return data;
  };

  export const createEvents = async (events) => {
    const response = await fetch(`${baseURL}/event/create`,{ method: 'POST', headers: myHeaders, body: events });
    const data = await response.json();
    console.log("Hello",data);
    return data;
  }

  //   fetch("http://localhost:3000/event/create", requestOptions)
  // .then(response => response.text())
  // .then(result => console.log(result))
  // .catch(error => console.log('error', error));
  // };
  
  export const deleteEvent = async (eventId) => {
    console.log("vikuuuuuu",eventId);
    // Delete the event using the event ID
     await fetch(`${baseURL}/event/delete/${eventId}`, { method: 'DELETE', headers: myHeaders });
  };
  