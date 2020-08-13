import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Map from "./components/Map";
import UploadFile from "./components/UploadFile";
import NavBar from "./components/NavBar";

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
      <UploadFile />
      <Map />
    </div>
  );
}

export default App;
