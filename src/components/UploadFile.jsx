import React, { useState } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";

const getUser = () => {
  const rawString = sessionStorage.getItem("user");
  const userObject = JSON.parse(rawString);
  return userObject;
};

export default function UploadFile({ apiBaseURL, setRedirect }) {
  // State Hook
  const [selectedFile, setSelectedFile] = useState(null);
  const [trip_name, setTrip_Name] = useState("");

  // On file select (from the pop up)
  const onFileChange = (event) => {
    // Update the state
    setSelectedFile(event.target.files[0]);
  };

  // On file upload (click the upload button)
  const onFileUpload = (event) => {
    event.preventDefault();

    if (!selectedFile || !trip_name) {
      console.log(
        `selectedFile or trip_name does not exist`,
        selectedFile,
        trip_name
      );
      document.getElementById(
        "card-footer-upload"
      ).innerHTML = `<p>Status: Missing input</p><p>Message: No file or trip name entered</p>`;
      return;
    }

    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append("data", selectedFile);
    formData.append("trip_name", trip_name);
    formData.append("filename", selectedFile.name);
    formData.append("user", getUser().data.id);

    // Details of the uploaded file
    console.log(`onFileUpload -> user`, getUser().data);

    // Request made to the backend api
    // Send formData object
    // console.log(`onFileUpload -> selectedFile`, selectedFile);
    const options = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    axios
      .post(`${apiBaseURL}/api/v1/all_maps/`, formData, options)
      .then((response) => {
        console.log(`onFileUpload -> response`, response);
        // Display status message for login in case of error
        document.getElementById(
          "card-footer-upload"
        ).innerHTML = `<p>Status: ${response.data.status.code}</p><p>Message: ${response.data.status.message}</p>`;

        if (response.data.status.code === 201) {
          // Change redirect state to true in order to trigger redirect
          setTimeout(() => {
            setRedirect(true);
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(`onFileUpload -> err`, err);

        document.getElementById(
          "card-footer-upload"
        ).innerHTML = `<p>Status: Error</p><p>Message: ${err}</p>`;
      });
  };

  // File content to be displayed after
  // file upload is complete
  const fileData = () => {
    if (selectedFile) {
      console.log(`fileData -> selectedFile`, selectedFile);

      return (
        <div className='mt-4 pt-4'>
          <Card.Title>File Details:</Card.Title>
          <Card.Text>File Name: {selectedFile.name}</Card.Text>
          <Card.Text>File Type: {selectedFile.type}</Card.Text>
          <Card.Text>
            Last Modified:{" "}
            {selectedFile.lastModifiedDate.toLocaleDateString("en-US")}
          </Card.Text>
          <Card.Text>
            Size: {(selectedFile.size / 1024).toFixed(3)} KiB
          </Card.Text>
          {/* <p>Database File: </p>
          {getDatabaseFile()}
          <p id='database_file'></p> */}
        </div>
      );
    } else {
      return (
        <div className='mt-4 pt-4'>
          <Card.Title>
            Choose a Google Maps Location History .json file to upload.
          </Card.Title>
        </div>
      );
    }
  };

  //Render
  return (
    <Card border='dark' key='upload-card' text='black' className='w-75 m-auto'>
      <Card.Header as='h3'>New Trip</Card.Header>
      <Card.Body>
        <Card.Title>Upload JSON File</Card.Title>
        <form
          encType='multipart/form-data'
          className='p-4 border border-success rounded'
        >
          <label htmlFor='trip_name' className='lead mx-2'>
            Trip Name{" "}
          </label>
          <input
            type='text'
            name='trip_name'
            className=''
            value={trip_name}
            onChange={(event) => {
              setTrip_Name(event.currentTarget.value);
            }}
          />
          <br />
          <input
            type='file'
            name='filename'
            className=''
            onChange={(e) => {
              onFileChange(e);
            }}
          />
          <button
            type='submit'
            name='submit'
            className='btn btn-primary'
            onClick={(e) => {
              onFileUpload(e);
            }}
          >
            Upload
          </button>
        </form>
        {fileData()}
      </Card.Body>
      <Card.Footer className='text-muted' id='card-footer-upload'>
        *Note: Please ensure file is less than 65535 bytes (65 KB) in size due
        to Heroku PostgreSQL database limitations
      </Card.Footer>
    </Card>
  );
}

/* 
Sources: 

https://www.geeksforgeeks.org/file-uploading-in-react-js/

*/
