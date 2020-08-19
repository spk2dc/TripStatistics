// Import
import React, { useEffect } from "react";

// Component
export default function LandingPage({ getSession, sessionUser }) {
  useEffect(() => {
    getSession();
  }, []);

  return (
    <div id='div-landing' className='jumbotron text-center'>
      <div className='container shadow p-3 mb-5 rounded container-landing'>
        <h1>Trip Statistics</h1>
        <p>
          Sign Up or Login to analyze your trips from Google Maps Location
          History!
        </p>
        <a href='https://takeout.google.com/settings/takeout' target='_blank'>
          Click here to downloaded your location data from Google
        </a>
        <br />
        <br />
        <a className='btn btn-outline-success m-3' href='/register'>
          Register
        </a>
        <a className='btn btn-outline-success m-3' href='/login'>
          Login
        </a>
      </div>
    </div>
  );
}
