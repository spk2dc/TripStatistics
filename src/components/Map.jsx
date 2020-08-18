import React, { useState, useEffect } from "react";

export default function Map({ mapMarkers }) {
  let map;
  const [mapLoaded, setMapLoaded] = useState(false);

  // only create map once
  useEffect(() => {
    createMap();
    console.log(`useEffect: `, mapMarkers.length, mapLoaded, window.google);
    if (typeof window.google === "object") {
      console.log(`useEffect markers: `, mapMarkers.length, map, window.google);
      createMarkers(map);
    }
  }, [mapMarkers]);

  const createMap = () => {
    // Attach your callback function to the `window` object
    console.log(`createMap begin`, mapMarkers.length, mapLoaded, window.google);
    window.initMap = function () {
      var latLng = new window.google.maps.LatLng(43.642567, -79.387054);
      console.log(
        `initMap before`,
        mapMarkers.length,
        mapLoaded,
        window.google
      );

      map = new window.google.maps.Map(document.getElementById("map"), {
        center: latLng,
        zoom: 8,
        streetViewControl: false,
      });

      setMapLoaded(true);
      console.log(`initMap after`, mapMarkers.length, mapLoaded, window.google);
      createMarkers(map);
    };

    // If google maps script does not exist then add it
    if (!document.getElementById("script-google-maps")) {
      // Create the script tag, set the appropriate attributes
      var script = document.createElement("script");
      script.setAttribute("id", "script-google-maps");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY_1}&callback=initMap&libraries=places,visualization`;
      script.defer = true;

      console.log(
        `create script `,
        mapMarkers.length,
        mapLoaded,
        window.google
      );
      // Append the 'script' element to 'head'
      document.head.appendChild(script);
    }
  };

  const createMarkers = (embeddedMap) => {
    setMapLoaded(true);
    let bounds = new window.google.maps.LatLngBounds();
    let heatmapLoc = [];

    console.log(`createMarkers -> mapMarkers`, mapMarkers);
    mapMarkers.map((place, i) => {
      // Coordinates for marker, converted to a valid number
      let latLng = new window.google.maps.LatLng(
        place.location.latitudeE7 / 1e7,
        place.location.longitudeE7 / 1e7
      );
      // Marker with a static label and hover title
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
      // Info window with details in html text
      let infowindow = new window.google.maps.InfoWindow({
        maxWidth: 300, // number in pixels
        content: `
        <div class='marker-infowindow-text'>
        <h6><u>${place.location.name}</u></h6>
        <span><b>Address:</b> ${place.location.address}</span>
        <br />
        <span><b>Start Time:</b> ${new Date(
          parseInt(place.duration.startTimestampMs, 10)
        ).toLocaleString()}</span>
        <br />
        <span><b>End Time:</b> ${new Date(
          parseInt(place.duration.endTimestampMs, 10)
        ).toLocaleString()}</span>
        </div>
        `,
      });

      // Enable info window to display when marker is clicked
      marker.addListener("click", () => {
        infowindow.open(embeddedMap, marker);
      });
      // Resize boundary to fit new marker
      bounds.extend(latLng);
      // Add coordinates to heatmap location array
      heatmapLoc.push(latLng);
      return marker;
    });

    // Fit map to boundary containing all markers
    embeddedMap.fitBounds(bounds);

    // Add heatmap layer to map
    let heatmap = new window.google.maps.visualization.HeatmapLayer({
      data: heatmapLoc,
      dissipating: true, //heatmap disappear on zoom
      radius: 250, //radius for each point in pixels
      opacity: 0.35, //scale 0-1
      map: embeddedMap,
    });
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
