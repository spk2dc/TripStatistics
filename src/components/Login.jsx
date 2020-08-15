// Imports
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

// Component
export default function Login({ apiBaseURL, getSession }) {
  // State Hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  // Form submission handler
  const submitForm = async (event) => {
    // Prevent page reload
    event.preventDefault();

    // Make post request to server
    const data = {
      email: email,
      password: password,
    };
    const options = {
      headers: { "Content-Type": "application/json" },
    };
    const response = await axios.post(
      `${apiBaseURL}/user/login`,
      data,
      options
    );

    // Store user in session storage
    const user = response.data;
    if (response.status === 200) {
      sessionStorage.setItem("user", JSON.stringify(user));
      getSession();
    }

    // Change redirect state to true in order to trigger redirect
    setRedirect(true);
  };

  // Render
  if (redirect) return <Redirect to='/all_trips' />;
  return (
    <form className='login text-center m-4' onSubmit={submitForm}>
      <label htmlFor='email'>Email</label>
      <br />
      <input
        type='text'
        id='email'
        name='email'
        value={email}
        onChange={(event) => {
          setEmail(event.currentTarget.value);
        }}
      />
      <br />
      <label htmlFor='password'>Password</label>
      <br />
      <input
        type='password'
        id='password'
        name='password'
        value={password}
        onChange={(event) => setPassword(event.currentTarget.value)}
      />
      <br />
      <button className='btn btn-primary m-2' type='submit'>
        Login
      </button>
    </form>
  );
}
