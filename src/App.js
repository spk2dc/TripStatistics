// React
import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
//CSS and Bootstrap
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
//Components
import AllTrips from "./components/AllTrips";
import UploadFile from "./components/UploadFile";
import NavBar from "./components/NavBar";
import LandingPage from "./components/LandingPage";

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
      <NavBar getSession={getSession} sessionUser={sessionUser} />
      <Switch>
        <Route exact path='/'>
          <LandingPage getSession={getSession} sessionUser={sessionUser} />
        </Route>
        <Route exact path='/all_trips'>
          <AllTrips />
        </Route>
        <Route exact path='/new_trip'>
          <UploadFile />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
