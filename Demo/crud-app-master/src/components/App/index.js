import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Navigate, Route } from "react-router-dom";
import Login from '../Login';
import Dashboard from '../Dashboard';
import EventList from '../EventList';
import CreateEvent from "../EventList/CreateEvent";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    setIsAuthenticated(JSON.parse(localStorage.getItem('is_authenticated')));
  }, []);

  return (
    // <>
    //   {isAuthenticated ? (
    //     <Dashboard setIsAuthenticated={setIsAuthenticated} />
    //   ) : (
    //     <Login setIsAuthenticated={setIsAuthenticated} />
    //   )}
    // </>
    <>
    <Router>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
         {/* Public route */}
         <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/eventlist" /> : <Login setIsAuthenticated={setIsAuthenticated} />}
        />

        {/* Private route */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />}
        />
        <Route
          path="/create"
          element={<CreateEvent setIsAuthenticated={setIsAuthenticated} />}
        />
        {/* <Route
          path="/eventlist"
          element={isAuthenticated ? <EventList setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />}
        /> */}
        
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
