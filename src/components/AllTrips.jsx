import React, { useState } from "react";
import axios from "axios";
import Map from "./Map";

export default function AllTrips() {
  // use localhost if environment url does not exist
  const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";

  // State Hook
  const [allData, setAllData] = useState([]);
  const [places, setPlaces] = useState([]);
  const [activities, setActivities] = useState([]);

  // get uploaded file from database and extract data
  const getDatabaseFile = (event) => {
    event.preventDefault();
    axios
      .get(`${baseURL}/api/v1/all_maps/`)
      .then((resp) => {
        console.log(`getDatabaseFile -> resp`, resp.data.data);
        // document.getElementById("database_file").textContent = resp.data.data[0].data;
        setAllData([...resp.data.data]);
        sortTrips();
      })
      .catch((err) => {
        console.log(`getDatabaseFile -> err`, err);
      });
  };

  const sortTrips = () => {
    allData.map((val, i) => {
      val.timelineObjects.map((item, j) => {
        return;
      });
    });
  };

  return (
    <div>
      <h1>All Trips</h1>
      <button
        onClick={(e) => {
          getDatabaseFile(e);
        }}
      >
        Refresh Data
      </button>
      <table>
        <caption>File Name: </caption>
        <thead>
          <tr>
            <th>Place</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {allData.map((val, i) => {
            return (
              <tr>
                <td>{val.data[0]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Map />
    </div>
  );
}

/* 
Sources: 

https://engineering.universe.com/building-a-google-map-in-react-b103b4ee97f1

https://developers.google.com/maps/documentation/javascript/overview#all

https://developers.google.com/maps/documentation/javascript/earthquakes

*/
