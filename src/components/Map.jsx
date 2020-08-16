import React, { useEffect } from "react";

export default function Map({ mapMarkers }) {
  let map;

  // only create map once
  useEffect(() => {
    createMap();
  });

  const createMap = () => {
    // Attach your callback function to the `window` object
    window.initMap = function () {
      var latLng = new window.google.maps.LatLng(43.642567, -79.387054);

      map = new window.google.maps.Map(document.getElementById("map"), {
        center: latLng,
        zoom: 8,
      });

      createMarkers(map);
    };

    // If google maps script does not exist then add it
    if (!document.getElementById("script-google-maps")) {
      // Create the script tag, set the appropriate attributes
      var script = document.createElement("script");
      script.setAttribute("id", "script-google-maps");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY_1}&callback=initMap&libraries=places`;
      script.defer = true;

      // Append the 'script' element to 'head'
      document.head.appendChild(script);
    }
  };

  const createMarkers = (embeddedMap) => {
    let bounds = new window.google.maps.LatLngBounds();

    console.log(`createMarkers -> mapMarkers`, mapMarkers);
    mapMarkers.map((place, i) => {
      let latLng = new window.google.maps.LatLng(
        place.location.latitudeE7 / 1e7,
        place.location.longitudeE7 / 1e7
      );
      let marker = new window.google.maps.Marker({
        position: latLng,
        map: embeddedMap,
        title: place.location.address,
        label: {
          text: place.location.name,
          color: "black",
          fontSize: "14px",
        },
      });

      bounds.extend(latLng);
      return marker;
    });

    embeddedMap.fitBounds(bounds);
  };

  return (
    <div>
      <h1>Map</h1>
      <div id='map' className='container text-center'></div>
    </div>
  );
}

/* 
Sources: 

https://engineering.universe.com/building-a-google-map-in-react-b103b4ee97f1

https://developers.google.com/maps/documentation/javascript/overview#all

https://developers.google.com/maps/documentation/javascript/earthquakes

*/
