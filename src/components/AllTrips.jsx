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
    // console.log(`getDatabaseFile -> baseURL`, `${baseURL}/api/v1/all_maps/`);

    axios
      .get(`${baseURL}/api/v1/all_maps/`)
      .then((resp) => {
        console.log(`getDatabaseFile -> resp`, resp.data.data);
        // document.getElementById("database_file").textContent = resp.data.data[0].data;
        setAllData([...resp.data.data]);
        sortData(resp.data.data);
      })
      .catch((err) => {
        console.log(`getDatabaseFile -> err`, err);
      });
  };

  const sortData = (databaseEntries) => {
    databaseEntries.map((oneFile, i) => {
      console.log(`Sorting data: `, oneFile);
      const jsonFile = JSON.parse(oneFile);
      if (jsonFile.hasOwnProperty("timelineObjects")) {
        jsonFile.timelineObjects.map((item, j) => {
          if (item.hasOwnProperty("activitySegment")) {
            setActivities([...activities, item]);
          }
          if (item.hasOwnProperty("placeVisit")) {
            setPlaces([...places, item]);
          }
        });
      } else {
        console.log(`Error, data is incorrectly formatted.`, oneFile);
      }
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
            <th>Address</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Latitude</th>
            <th>Longitude</th>
          </tr>
        </thead>
        <tbody>
          {places.map((val, i) => {
            return (
              <tr>
                <td>{val.location.name}</td>
                <td>{val.location.address}</td>
                <td>{val.location.startTimestampMs}</td>
                <td>{val.location.endTimestampMs}</td>
                <td>{val.location.latitudeE7}</td>
                <td>{val.location.longitudeE7}</td>
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
