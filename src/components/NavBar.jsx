// Imports
import React, { useEffect } from "react";
import { Nav, Navbar, Button } from "react-bootstrap";

export default function NavBar({ getSession, sessionUser }) {
  // Logout on click handler
  const destroySession = () => {
    sessionStorage.setItem("user", "");
    getSession();
  };

  useEffect(() => {
    getSession();
  }, []);

  // Render
  return (
    <Navbar
      collapseOnSelect
      expand='md'
      bg='dark'
      variant='dark'
      className='fixed-top'
    >
      <Navbar.Brand id='nav-title' href='/'>
        <i className='fas fa-map-marked-alt fa-lg mx-2'></i>
        Trip Statistics
      </Navbar.Brand>

      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>
          {sessionUser ? (
            <>
              <Nav.Link href='/profile'>Profile</Nav.Link>
              <Nav.Link href='/all_trips'>All Trips</Nav.Link>
              <Nav.Link href='/new_trip'>New Trip</Nav.Link>
              <Button
                type='button'
                id='btnLogout'
                onClick={destroySession}
                href='/'
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Nav.Link href='/register'>Register</Nav.Link>
              <Nav.Link href='/login'>Login</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
