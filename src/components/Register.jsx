// Imports
import React, { useState } from "react";
import { Redirect } from "react-router-dom";

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

    // Make signup request to server
    const signupURL = `${apiBaseURL}/user/register`;
    console.log(`submitForm -> signupURL`, signupURL);
    const signupConfig = {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    };
    const signup = await fetch(signupURL, signupConfig);
    const user = await signup.json();
    console.log(`fetch success`, user);

    // Automatically log in user
    const loginURL = `${apiBaseURL}/user/login`;
    const loginConfig = {
      method: "POST",
      body: JSON.stringify({
        username: user.username,
        email: user.email,
        password: user.password,
      }),
      headers: { "Content-Type": "application/json" },
    };
    const login = await fetch(loginURL, signupConfig);
    console.log(`login successful`);

    // Store user in session storage
    if (login.status === 200) {
      sessionStorage.setItem("user", JSON.stringify(user));
      console.log(`login status 200`, signupURL);
      getSession();
    }

    // Change redirect state to true
    setRedirect(true);
  };

  // Render
  if (redirect) return <Redirect to='/' />;
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
