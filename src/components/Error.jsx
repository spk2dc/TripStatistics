// Import
import React from "react";
import { Card } from "react-bootstrap";

// Component
const Error = () => {
  return (
    <Card bg='danger' key='error-card' text='white' className='w-50 m-auto'>
      <Card.Header>Error 404</Card.Header>
      <Card.Body>
        <Card.Title>Page Not Found</Card.Title>
        <Card.Text>
          <p>Either you have not logged in or this url does not exist:</p>
          <p>{window.location.href}</p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

// Component export
export default Error;
