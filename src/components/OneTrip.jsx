import React, { useState, useEffect } from "react";
import axios from "axios";
import TablePlaces from "./TablePlaces";
import TableActivities from "./TableActivities";
import Map from "./Map";
import { useParams } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";

export default function OneTrip() {
  // use localhost if environment url does not exist
  const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";

  //URL query parameters from react router hook useParams
  const params = useParams();

  // State Hook
  const [oneTrip, setOneTrip] = useState({});
  const [sortedData, setSortedData] = useState({
    places: [],
    activities: [],
  });

  // sort data every time it is changed
  useEffect(() => {
    getOneTrip();
  }, []);

  // get uploaded file from database and extract data
  const getOneTrip = () => {
    // console.log(`getOneTrip -> baseURL`, `${baseURL}/api/v1/all_maps/`);

    axios
      .get(`${baseURL}/api/v1/all_maps/${params.id}`)
      .then((resp) => {
        console.log(`getOneTrip -> resp`, resp.data.data);
        // document.getElementById("database_file").textContent = resp.data.data[0].data;
        setOneTrip(resp.data.data);
        sortData(resp.data.data);
      })
      .catch((err) => {
        console.log(`getOneTrip -> err`, err);
      });
  };

  const sortData = (trip) => {
    let temp_places = [];
    let temp_activities = [];

    // console.log(`Sorting data: `, trip.data);
    const jsonFile = JSON.parse(trip.data);
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
      console.log(`Error, data is incorrectly formatted.`, trip);
    }

    setSortedData({
      places: [...temp_places],
      activities: [...temp_activities],
    });

    // console.log(`Sorted places: `, temp_places);
    // console.log(`Sorted activities: `, temp_activities);
    return true;
  };

  return (
    <div className='container-fluid'>
      {oneTrip.hasOwnProperty("trip_name") ? (
        <h1>Trip: {oneTrip.trip_name}</h1>
      ) : (
        <h1>Unnamed</h1>
      )}
      <h3>Trip ID: {params.id}</h3>

      <Tabs defaultActiveKey='places'>
        <Tab eventKey='places' title='Places'>
          <TablePlaces placeArr={sortedData.places} />
        </Tab>
        <Tab eventKey='activities' title='Activities'>
          <TableActivities activityArr={sortedData.activities} />
        </Tab>
      </Tabs>

      <Map mapMarkers={sortedData.places} />
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
