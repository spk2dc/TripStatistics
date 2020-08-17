// Imports
import React from "react";
import { Card } from "react-bootstrap";

// Component
export default function Profile({ sessionUser }) {
  return (
    <Card bg='success' key='profile-card' text='white' className='w-50 m-auto'>
      <Card.Header>Profile</Card.Header>
      <Card.Body>
        <Card.Title>{"Welcome " + sessionUser.username}!</Card.Title>
        <Card.Text>
          <b>Email: </b>
          {sessionUser.email}
        </Card.Text>
        <Card.Text>
          Click on the new trips tab to upload a '.json' file from Google Maps
          Location History.
          <br />
          <br />
          Then view all of your uploaded trips in the All Trips tab and click on
          one to view a detailed map of all the places you went to and
          activities you did on that trip!
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
