import React from "react";
import Map from "./Map";

export default function AllTrips() {
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

  return (
    <div>
      <h1>All Trips</h1>
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
