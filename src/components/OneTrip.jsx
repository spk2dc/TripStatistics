import React, { useState, useEffect } from "react";
import axios from "axios";
import TablePlaces from "./TablePlaces";
import TableActivities from "./TableActivities";
import Map from "./Map";
import { Redirect, useParams } from "react-router-dom";
import { Tab, Tabs, Card, Accordion } from "react-bootstrap";

export default function OneTrip() {
  // use localhost if environment url does not exist
  const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";

  //URL query parameters from react router hook useParams
  const params = useParams();

  // State Hook
  const [redirect, setRedirect] = useState(false);
  const [oneTrip, setOneTrip] = useState({});
  const [sortedData, setSortedData] = useState({
    places: [],
    activities: [],
  });

  // On render get trip data and remove problematic bootstrap class
  useEffect(() => {
    // Get all trip data
    getOneTrip();

    // Remove bootstrap class automatically added to Tabs navigation that is messing up formatting inside of a card
    document
      .getElementsByClassName("tab-nested")[0]
      .classList.remove("card-header-tabs");
  }, []);

  // get uploaded file from database and extract data
  const getOneTrip = () => {
    // console.log(`getOneTrip -> baseURL`, `${baseURL}/api/v1/all_maps/`);
    const options = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    axios
      .get(`${baseURL}/api/v1/all_maps/${params.id}`, options)
      .then((resp) => {
        console.log(`getOneTrip -> resp`, resp);
        if (resp.data.status.code === 500) {
          console.log(
            `Error, this trip does not belong to the currently logged in user.`
          );
          setRedirect(true);
        }
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

  // Render
  if (redirect) return <Redirect to='/invalid_trip_id' />;
  return (
    <div className='container-fluid'>
      {oneTrip.hasOwnProperty("trip_name") ? (
        <h1>Trip: {oneTrip.trip_name}</h1>
      ) : (
        <h1>Unnamed</h1>
      )}
      <h3>Trip ID: {params.id}</h3>

      <Accordion defaultActiveKey='0' className='m-2'>
        <Card>
          <Accordion.Toggle
            as={Card.Header}
            eventKey='0'
            className='border border-primary card-header-clickable'
          >
            Place and Activity Data
          </Accordion.Toggle>
          <Accordion.Collapse
            eventKey='0'
            className='p-3 border border-primary'
          >
            <Tabs defaultActiveKey='places' className='tab-nested'>
              <Tab eventKey='places' title='Places' className='overflow-auto'>
                <TablePlaces placeArr={sortedData.places} />
              </Tab>
              <Tab
                eventKey='activities'
                title='Activities'
                className='overflow-auto'
              >
                <TableActivities activityArr={sortedData.activities} />
              </Tab>
            </Tabs>
          </Accordion.Collapse>
        </Card>
      </Accordion>

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
