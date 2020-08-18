import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AllTrips() {
  // use localhost if environment url does not exist
  const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";

  // State Hook
  const [allData, setAllData] = useState([]);

  // Pull data as soon as page loads
  useEffect(() => {
    getDatabaseFile();
  }, []);

  // get uploaded file from database and extract data
  const getDatabaseFile = () => {
    // console.log(`getDatabaseFile -> baseURL`, `${baseURL}/api/v1/all_maps/`);
    const options = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    axios
      .get(`${baseURL}/api/v1/all_maps/`, options)
      .then((resp) => {
        console.log(`getDatabaseFile -> resp`, resp.data.data);
        // document.getElementById("database_file").textContent = resp.data.data[0].data;
        setAllData([...resp.data.data]);
      })
      .catch((err) => {
        console.log(`getDatabaseFile -> err`, err);
      });
  };

  return (
    <div className='container-fluid'>
      <h1>All Trips</h1>

      <table className='table table-bordered table-hover table-striped'>
        {/* <caption>Trips </caption> */}
        <thead>
          <tr>
            <th>Database ID</th>
            <th>Trip Name</th>
            <th>File Name</th>
            <th>Upload Time</th>
          </tr>
        </thead>
        <tbody>
          {allData.map((val, i) => {
            if (val.hasOwnProperty("id")) {
              return (
                <tr
                  key={`row${i}-${val.id}`}
                  className='clickable-row'
                  onClick={() => (window.location = `/trip/${val.id}`)}
                >
                  <td>{val.id}</td>
                  <td>{val.trip_name}</td>
                  <td>{val.filename}</td>
                  <td>{val.created_at}</td>
                </tr>
              );
            } else {
              return (
                <tr>
                  <td>{"null"}</td>
                  <td>{"null"}</td>
                  <td>{"null"}</td>
                  <td>{"null"}</td>
                  <td>{"null"}</td>
                  <td>{"null"}</td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
}

/* 
Sources: 

https://engineering.universe.com/building-a-google-map-in-react-b103b4ee97f1

https://developers.google.com/maps/documentation/javascript/overview#all

https://developers.google.com/maps/documentation/javascript/earthquakes

*/
