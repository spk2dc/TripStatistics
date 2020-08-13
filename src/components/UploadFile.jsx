import React, { useState } from "react";
import axios from "axios";

export default function UploadFile() {
  // use localhost if environment url does not exist
  const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";

  // State Hook
  const [selectedFile, setSelectedFile] = useState(null);

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
    formData.append("name", selectedFile.name);
    formData.append("user", "user5");

    // Details of the uploaded file
    console.log(`onFileUpload -> formData`, formData);

    // Request made to the backend api
    // Send formData object
    // axios.post("api/v1/all_maps/", formData);
    axios.post(`${baseURL}/api/v1/all_maps/`, formData);
  };

  // get uploaded file from database and extract data
  const getDatabaseFile = () => {
    axios
      .get(`${baseURL}/api/v1/all_maps/`)
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
        <div>
          <h2>File Details:</h2>
          <p>File Name: {selectedFile.name}</p>
          <p>File Type: {selectedFile.type}</p>
          <p>
            Last Modified:{" "}
            {selectedFile.lastModifiedDate.toLocaleDateString("en-US")}
          </p>
          <p>Size: {(selectedFile.size / 1024).toFixed(3)} KiB</p>
          <p>Database File: </p>
          {getDatabaseFile()}
          <p id='database_file'></p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  return (
    <div>
      <h1>Upload File</h1>
      <form encType='multipart/form-data'>
        <input
          type='file'
          name='file'
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
    </div>
  );
}

/* 
Sources: 

https://www.geeksforgeeks.org/file-uploading-in-react-js/

*/
