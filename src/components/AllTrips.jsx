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
    // reset arrays
    setActivities([]);
    setPlaces([]);

    databaseEntries.map((oneFile, i) => {
      // console.log(`Sorting data: `, oneFile.data);
      const jsonFile = JSON.parse(oneFile.data);
      if (jsonFile.hasOwnProperty("timelineObjects")) {
        console.log(`Sorting file ${i}: `, jsonFile);
        jsonFile.timelineObjects.map((item, j) => {
          if (item.hasOwnProperty("activitySegment")) {
            console.log(`activity item ${j}`, item.activitySegment);
            setActivities([...activities, item.activitySegment]);
          }
          if (item.hasOwnProperty("placeVisit")) {
            console.log(`places item ${j}`, item.placeVisit);
            setPlaces([...places, item.placeVisit]);
          }
        });
      } else {
        console.log(`Error, data is incorrectly formatted.`, oneFile);
      }
    });

    console.log(`Sorted places: `, places);
    console.log(`Sorted activities: `, activities);
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
        <caption>Places </caption>
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
            if (val.hasOwnProperty("location")) {
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

      <table>
        <caption>Activities </caption>
        <thead>
          <tr>
            <th>Distance</th>
            <th>Type</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Start (Lat,Long)</th>
            <th>End (Lat,Long)</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((val, i) => {
            if (val.hasOwnProperty("distance")) {
              return (
                <tr>
                  <td>{val.distance}</td>
                  <td>{val.activityType}</td>
                  <td>{val.duration.startTimestampMs}</td>
                  <td>{val.duration.endTimestampMs}</td>
                  <td>
                    {val.startLocation.latitudeE7 +
                      ", " +
                      val.startLocation.longitudeE7}
                  </td>
                  <td>
                    {val.endLocation.latitudeE7 +
                      ", " +
                      val.endLocation.longitudeE7}
                  </td>
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
      {/* <Map /> */}
    </div>
  );
}

/* 
Sources: 

https://engineering.universe.com/building-a-google-map-in-react-b103b4ee97f1

https://developers.google.com/maps/documentation/javascript/overview#all

https://developers.google.com/maps/documentation/javascript/earthquakes

*/
