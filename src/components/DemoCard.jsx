import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

export default function DemoCard({ apiBaseURL }) {
  //Render
  return (
    <Card
      border='dark'
      key='demo-card'
      text='black'
      className='w-75 mx-auto my-3'
    >
      <Card.Header as='h3'>Demo Files</Card.Header>
      <Card.Body>
        <Card.Title>
          Choose a provided file below to try out if you do not have your own!
        </Card.Title>
        <Link
          to='/TripStatistics_Demo_File_Taipei.json'
          target='_blank'
          rel='noopener noreferrer'
          className='m-2'
          download
        >
          Download Demo - Taipei, Taiwan
        </Link>

        <br />

        <Link
          to='/TripStatistics_Demo_File_Kaohsiung.json'
          target='_blank'
          rel='noopener noreferrer'
          className='m-2'
          download
        >
          Download Demo - Kaohsiung, Taiwan
        </Link>

        <br />

        <Link
          to='/TripStatistics_Demo_File_Hualien.json'
          target='_blank'
          rel='noopener noreferrer'
          className='m-2'
          download
        >
          Download Demo - Hualien, Taiwan
        </Link>
      </Card.Body>
    </Card>
  );
}
