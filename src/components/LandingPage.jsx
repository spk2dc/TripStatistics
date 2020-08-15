// Import
import React, { useEffect } from "react";

// Component
export default function LandingPage({ getSession, sessionUser }) {
  useEffect(() => {
    getSession();
  }, []);

  return (
    <div id='div-landing' className='jumbotron text-center'>
      <h1>Trip Statistics</h1>
      <div>
        <p>Sign Up or Login to analyze your trips!</p>
        <a className='btn btn-outline-success m-2' href='/register'>
          Register
        </a>
        <a className='btn btn-outline-success m-2' href='/login'>
          Login
        </a>
      </div>
    </div>
  );
}
