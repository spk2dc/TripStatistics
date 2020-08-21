import React from "react";

export default function TableActivities({ activityArr }) {
  return (
    <table className='table table-bordered table-hover table-striped'>
      {/* <caption>Activities </caption> */}
      <thead>
        <tr>
          <th className='align-middle'>Distance</th>
          <th className='align-middle'>Type</th>
          <th className='align-middle'>Start Time</th>
          <th className='align-middle'>End Time</th>
          <th className='align-middle'>Start (Lat, Long)</th>
          <th className='align-middle'>End (Lat, Long)</th>
        </tr>
      </thead>
      <tbody>
        {activityArr.map((val, i) => {
          if (val.hasOwnProperty("distance")) {
            const startTimeRaw = parseInt(val.duration.startTimestampMs, 10);
            const endTimeRaw = parseInt(val.duration.endTimestampMs, 10);
            let dateOptions = {
              timeZone: "UTC",
              timeZoneName: "short",
              hour12: false,
            };

            return (
              <tr key={`table-activity-row${i}`}>
                <td>{val.distance}</td>
                <td>{val.activityType}</td>
                <td>
                  {new Date(startTimeRaw).toLocaleString(
                    undefined,
                    dateOptions
                  )}
                </td>
                <td>
                  {new Date(endTimeRaw).toLocaleString(undefined, dateOptions)}
                </td>
                <td>
                  {val.startLocation.latitudeE7 / 1e7 +
                    ", " +
                    val.startLocation.longitudeE7 / 1e7}
                </td>
                <td>
                  {val.endLocation.latitudeE7 / 1e7 +
                    ", " +
                    val.endLocation.longitudeE7 / 1e7}
                </td>
              </tr>
            );
          } else {
            return (
              <tr key={`table-activity-row${i}`}>
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
