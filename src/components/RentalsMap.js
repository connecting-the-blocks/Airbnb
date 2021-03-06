import React from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import { useState, useEffect } from "react";

function RentalsMap({ location, google, setHighLight }) {
  const [center, setCenter] = useState();
  useEffect(() => {
    var arr = Object.keys(location);
    var getLat = (key) => location[key]["lat"];
    var avgLat = arr.reduce((a, c) => a + Number(getLat(c)), 0) / arr.length;

    var getLng = (key) => location[key]["lng"];
    var avgLng = arr.reduce((a, c) => a + Number(getLng(c)), 0) / arr.length;

    setCenter({ lat: avgLat, lng: avgLng });
  }, [location]);

  return (
    <>
      {center && (
        <Map
          google={google}
          containerStyle={{
            width: "50vw",
            height: "calc(100vh - 135px)",
          }}
          center={center}
          initialCenter={location[0]}
          zoom={13}
          disableDefaultUI={true}
        >
          {location.map((coords, i) => (
            <Marker position={coords} onClick={() => setHighLight(i)} />
          ))}
        </Map>
      )}
    </>
  );
}

export default GoogleApiWrapper({
  apiKey: "",
})(RentalsMap);

