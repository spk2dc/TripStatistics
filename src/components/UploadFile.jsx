import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Card } from "react-bootstrap";
import axios from "axios";

const getUser = () => {
  const rawString = sessionStorage.getItem("user");
  const userObject = JSON.parse(rawString);
  return userObject;
};

export default function UploadFile({ apiBaseURL }) {
  // State Hook
  const [selectedFile, setSelectedFile] = useState(null);
  const [trip_name, setTrip_Name] = useState("");
  const [redirect, setRedirect] = useState(false);

  // On file select (from the pop up)
  const onFileChange = (event) => {
    // Update the state
    setSelectedFile(event.target.files[0]);
  };

  // On file upload (click the upload button)
  const onFileUpload = (event) => {
    event.preventDefault();

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
          }, 1500);
        }
      })
      .catch((err) => {
        console.log(`onFileUpload -> err`, err);

        document.getElementById(
          "card-footer-upload"
        ).innerHTML = `<p>Status: ${err.data.status.code}</p><p>Message: ${err.data.status.message}</p>`;
      });
  };

  // get uploaded file from database and extract data
  const getDatabaseFile = () => {
    axios
      .get(`${apiBaseURL}/api/v1/all_maps/`)
      .then((resp) => {
        console.log(`getDatabaseFile -> resp`, resp.data.data[0].data);
        document.getElementById("database_file").textContent =
          resp.data.data[0].data;
      })
      .catch((err) => {
        console.log(`getDatabaseFile -> err`, err);
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
  if (redirect) return <Redirect to='/all_trips' />;
  return (
    <div className='container'>
      <Card
        border='dark'
        key='upload-card'
        text='black'
        className='w-75 m-auto'
      >
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

      <br />
      <br />
      <Card
        border='dark'
        key='upload-card'
        text='black'
        className='w-75 mx-auto my-3'
      >
        <Card.Header as='h3'>Demo Files</Card.Header>
        <Card.Body>
          <Card.Title>
            Choose a provided file below to try out if you do not have your own!
          </Card.Title>
          <form encType='multipart/form-data' className='p-4'>
            <button
              type='submit'
              name='submit'
              className='btn btn-outline-primary mx-3'
              onClick={(e) => {
                setTrip_Name("Demo File 1");
                setSelectedFile("./2019_AUGUST_small.json");
                onFileUpload(e);
              }}
            >
              Upload Demo 1
            </button>

            <button
              type='submit'
              name='submit'
              className='btn btn-outline-primary mx-3'
              onClick={(e) => {
                setTrip_Name("Demo File 2");
                setSelectedFile("./2019_AUGUST_small.json");
                onFileUpload(e);
              }}
            >
              Upload Demo 2
            </button>

            <button
              type='submit'
              name='submit'
              className='btn btn-outline-primary mx-3 my-1'
              onClick={(e) => {
                setTrip_Name("Demo File 3");
                setSelectedFile("./2019_AUGUST_small.json");
                onFileUpload(e);
              }}
            >
              Upload Demo 3
            </button>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}

/* 
Sources: 

https://www.geeksforgeeks.org/file-uploading-in-react-js/

*/
