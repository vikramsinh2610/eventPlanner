import { BrowserRouter as Router, Routes, Navigate, Route } from "react-router-dom";
import Registrationgin from '../Registration';
import EventList from '../EventList';
import CreateEvent from "../EventList/CreateEvent";
import EventDetail from "../EventList/EventDetail";
import UpdateEvent from  "../EventList/UpdateEvent";

const App = () => {

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/register"
            element={<Registrationgin />}
          />

          <Route
            path="/create"
            element={<CreateEvent />}
          />
          <Route
            path="/eventlist"
            element={<EventList />}
          />

          <Route
            path="/detail/:eventId"
            element={<EventDetail />}
          />

          <Route
            path="/edit/:eventId"
            element={<UpdateEvent />}
          />

          <Route path="*" element={<Navigate to="/register" />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
