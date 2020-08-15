import React from "react";

export default function TableActivities({ activityArr }) {
  return (
    <table className='table table-bordered table-hover table-striped'>
      {/* <caption>Activities </caption> */}
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
        {activityArr.map((val, i) => {
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
  );
}

/* 
Sources: 

https://engineering.universe.com/building-a-google-map-in-react-b103b4ee97f1

https://developers.google.com/maps/documentation/javascript/overview#all

https://developers.google.com/maps/documentation/javascript/earthquakes

https://blog.logrocket.com/react-router-hooks-will-make-your-component-cleaner/

*/
