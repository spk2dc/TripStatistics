import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import UploadFile from "./UploadFile";
import DemoCard from "./DemoCard";

export default function NewTrip({ apiBaseURL }) {
  // State Hook
  const [redirect, setRedirect] = useState(false);

  //Render
  if (redirect) return <Redirect to='/all_trips' />;
  return (
    <div className='container'>
      <UploadFile apiBaseURL={apiBaseURL} setRedirect={setRedirect} />

      <br />
      <br />

      <DemoCard />
    </div>
  );
}

/* 
Sources: 

https://www.geeksforgeeks.org/file-uploading-in-react-js/

*/
