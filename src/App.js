// React
import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
//CSS and Bootstrap
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
//Components
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import AllTrips from "./components/AllTrips";
import NewTrip from "./components/NewTrip";
import NavBar from "./components/NavBar";
import LandingPage from "./components/LandingPage";
import OneTrip from "./components/OneTrip";
import Error from "./components/Error";

// Configuration
const API = {
  local: "http://localhost:8000",
  deployed: "https://tripstatistics-backend.herokuapp.com",
  user: "/user/",
  all_maps: "/api/v1/all_maps/",
};
const baseURL = process.env.REACT_APP_API_URL ? API.deployed : API.local;

// Component
function App() {
  // State Hook
  const [sessionUser, setSessionUser] = useState("");

  // Get session function
  const getSession = () => {
    const userString = sessionStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : userString;
    setSessionUser(user);
  };

  // Render
  return (
    <div className='App'>
      <NavBar
        apiBaseURL={baseURL}
        getSession={getSession}
        sessionUser={sessionUser}
      />
      <Switch>
        <Route exact path='/'>
          <LandingPage getSession={getSession} sessionUser={sessionUser} />
        </Route>
        <Route exact path='/register'>
          <Register apiBaseURL={baseURL} getSession={getSession} />
        </Route>
        <Route exact path='/login'>
          <Login apiBaseURL={baseURL} getSession={getSession} />
        </Route>
        <Route exact path='/profile'>
          <Profile sessionUser={sessionUser} />
        </Route>
        <Route exact path='/all_trips'>
          <AllTrips />
        </Route>
        <Route exact path='/trip/:id'>
          <OneTrip />
        </Route>
        <Route exact path='/new_trip'>
          <NewTrip apiBaseURL={baseURL} />
        </Route>
        <Route component={Error} />
      </Switch>
    </div>
  );
}

export default App;
