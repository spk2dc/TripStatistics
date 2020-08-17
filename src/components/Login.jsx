// Imports
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Card } from "react-bootstrap";
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
      withCredentials: true,
    };
    const response = await axios.post(
      `${apiBaseURL}/user/login`,
      data,
      options
    );

    // Store user in session storage
    const user = response.data;
    console.log(`submitForm -> response`, response);
    if (response.data.status.code === 200) {
      sessionStorage.setItem("user", JSON.stringify(user));
      getSession();
    }

    document.getElementById(
      "card-footer-login"
    ).innerHTML = `<p>Status: ${response.data.status.code}</p><p>Message: ${response.data.status.message}</p>`;

    // Change redirect state to true in order to trigger redirect
    setRedirect(true);
  };

  // Render
  if (redirect) return <Redirect to='/profile' />;
  return (
    <Card
      border='primary'
      key='upload-card'
      text='black'
      className='w-50 m-auto'
    >
      <Card.Header as='h3'>Login</Card.Header>
      <Card.Body>
        <Card.Title>Upload JSON File</Card.Title>
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
      </Card.Body>
      <Card.Footer className='text-muted' id='card-footer-login'>
        Login Status
      </Card.Footer>
    </Card>
  );
}
