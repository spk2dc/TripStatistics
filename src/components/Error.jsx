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
        <Card.Text>This url does not exist: {window.location.href}</Card.Text>
      </Card.Body>
    </Card>
  );
};

// Component export
export default Error;
