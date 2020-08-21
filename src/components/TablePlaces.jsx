import React from "react";

export default function TablePlaces({ placeArr }) {
  return (
    <table className='table table-bordered table-hover table-striped'>
      {/* <caption>Places </caption> */}
      <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Latitude</th>
          <th>Longitude</th>
          {/* <th>Place ID</th> */}
        </tr>
      </thead>
      <tbody>
        {placeArr.map((val, i) => {
          if (val.hasOwnProperty("location")) {
            const startTimeRaw = parseInt(val.duration.startTimestampMs, 10);
            const endTimeRaw = parseInt(val.duration.endTimestampMs, 10);
            let dateOptions = {
              timeZone: "UTC",
              timeZoneName: "short",
              hour12: false,
            };

            return (
              <tr key={`table-place-row${i}`}>
                <td>{val.location.name}</td>
                <td>{val.location.address}</td>
                <td>
                  {new Date(startTimeRaw).toLocaleString(
                    undefined,
                    dateOptions
                  )}
                </td>
                <td>
                  {new Date(endTimeRaw).toLocaleString(undefined, dateOptions)}
                </td>
                <td>{val.location.latitudeE7 / 1e7}</td>
                <td>{val.location.longitudeE7 / 1e7}</td>
                {/* <td>{val.location.placeId}</td> */}
              </tr>
            );
          } else {
            return (
              <tr key={`table-place-row${i}`}>
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
