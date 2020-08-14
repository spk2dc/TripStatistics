import React, { useState, useEffect } from "react";
import axios from "axios";
import Map from "./Map";
import { useParams } from "react-router-dom";

export default function OneTrip() {
  // use localhost if environment url does not exist
  const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";

  //URL query parameters from react router hook useParams
  const params = useParams();

  // State Hook
  const [allData, setAllData] = useState([]);
  const [sortedData, setSortedData] = useState({
    places: [],
    activities: [],
  });

  // sort data every time it is changed
  useEffect(() => {
    getDatabaseFile();
  }, []);

  // get uploaded file from database and extract data
  const getDatabaseFile = () => {
    // console.log(`getDatabaseFile -> baseURL`, `${baseURL}/api/v1/all_maps/`);

    axios
      .get(`${baseURL}/api/v1/all_maps/`)
      .then((resp) => {
        console.log(`getDatabaseFile -> resp`, resp.data.data);
        // document.getElementById("database_file").textContent = resp.data.data[0].data;
        setAllData([...resp.data.data]);
        sortData([...resp.data.data]);
      })
      .catch((err) => {
        console.log(`getDatabaseFile -> err`, err);
      });
  };

  const sortData = (trip) => {
    let temp_places = [];
    let temp_activities = [];

    trip.map((oneFile, i) => {
      // console.log(`Sorting data: `, oneFile.data);
      const jsonFile = JSON.parse(oneFile.data);
      if (jsonFile.hasOwnProperty("timelineObjects")) {
        // console.log(`Sorting file ${i}: `, jsonFile);
        jsonFile.timelineObjects.map((item, j) => {
          if (item.hasOwnProperty("activitySegment")) {
            // console.log(`activity item ${j}`, item.activitySegment);
            temp_activities = [...temp_activities, item.activitySegment];
          }
          if (item.hasOwnProperty("placeVisit")) {
            // console.log(`places item ${j}`, item.placeVisit);
            temp_places = [...temp_places, item.placeVisit];
          }
          return true;
        });
      } else {
        console.log(`Error, data is incorrectly formatted.`, oneFile);
      }

      setSortedData({
        places: [...temp_places],
        activities: [...temp_activities],
      });
      return true;
    });

    // console.log(`Sorted places: `, temp_places);
    // console.log(`Sorted activities: `, temp_activities);
    return true;
  };

  return (
    <div>
      <h1>Trip ID: {params.id}</h1>

      <table className='table table-bordered table-hover table-striped'>
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
          {sortedData.places.map((val, i) => {
            if (val.hasOwnProperty("location")) {
              const startTimeRaw = parseInt(val.duration.startTimestampMs, 10);
              const endTimeRaw = parseInt(val.duration.endTimestampMs, 10);

              return (
                <tr key={`row${i}-${val.location.placeId}`}>
                  <td>{val.location.name}</td>
                  <td>{val.location.address}</td>
                  <td>{new Date(startTimeRaw).toLocaleString()}</td>
                  <td>{new Date(endTimeRaw).toLocaleString()}</td>
                  <td>{val.location.latitudeE7 / 10000000}</td>
                  <td>{val.location.longitudeE7 / 10000000}</td>
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

      <table className='table table-bordered table-hover table-striped'>
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
          {sortedData.activities.map((val, i) => {
            if (val.hasOwnProperty("distance")) {
              const startTimeRaw = parseInt(val.duration.startTimestampMs, 10);
              const endTimeRaw = parseInt(val.duration.endTimestampMs, 10);

              return (
                <tr key={`row${i}-${val.duration.startTimestampMs}`}>
                  <td>{val.distance}</td>
                  <td>{val.activityType}</td>
                  <td>{new Date(startTimeRaw).toLocaleString()}</td>
                  <td>{new Date(endTimeRaw).toLocaleString()}</td>
                  <td>
                    {val.startLocation.latitudeE7 / 10000000 +
                      ", " +
                      val.startLocation.longitudeE7 / 10000000}
                  </td>
                  <td>
                    {val.endLocation.latitudeE7 / 10000000 +
                      ", " +
                      val.endLocation.longitudeE7 / 10000000}
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

https://blog.logrocket.com/react-router-hooks-will-make-your-component-cleaner/

*/
