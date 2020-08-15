// Imports
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

// Component
export default function Register({ apiBaseURL, getSession }) {
  // State Hooks
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  // Form submission handler
  const submitForm = async (event) => {
    // Prevent page reload
    event.preventDefault();

    // Make register request to server
    const data = {
      username: username,
      email: email,
      password: password,
    };
    const options = {
      headers: { "Content-Type": "application/json" },
    };
    const register = await axios.post(
      `${apiBaseURL}/user/register`,
      data,
      options
    );
    const user = register.data;

    // Automatically log in user
    const login = await axios.post(`${apiBaseURL}/user/login`, data, options);

    // Store user in session storage
    if (login.status === 200) {
      sessionStorage.setItem("user", JSON.stringify(user));
      console.log(`register and login status 200`, apiBaseURL);
      getSession();
    }

    // Change redirect state to true
    setRedirect(true);
  };

  // Render
  if (redirect) return <Redirect to='/all_trips' />;
  return (
    <form className='signup text-center m-4' onSubmit={submitForm}>
      <label htmlFor='name'>Username</label>
      <br />
      <input
        type='text'
        name='name'
        id='name'
        value={username}
        onChange={(event) => setUsername(event.currentTarget.value)}
      />
      <br />
      <label htmlFor='email'>Email</label>
      <br />
      <input
        type='text'
        name='email'
        id='email'
        value={email}
        onChange={(event) => setEmail(event.currentTarget.value)}
      />
      <br />
      <label htmlFor='password'>Password</label>
      <br />
      <input
        type='password'
        name='password'
        id='password'
        value={password}
        onChange={(event) => setPassword(event.currentTarget.value)}
      />
      <br />
      <button className='btn btn-primary m-2' type='submit'>
        Register
      </button>
    </form>
  );
}
