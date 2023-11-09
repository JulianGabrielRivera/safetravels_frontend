import React from "react";
import { createContext, useState, useEffect } from "react";

const GeoContext = createContext();

const GeoLocationWrapper = ({ children }) => {
  const [lat, setLatitude] = useState(null);
  const [long, setLongitude] = useState(null);
  useEffect(() => {
    // if ("geolocation" in navigator) {

    // navigator.geolocation.getCurrentPosition(function (position) {
    if (lat && long) setLatitude(lat);
    setLongitude(long);
    console.log(lat);

    // Do something with the latitude and longitude, e.g., set them in the component's state
    // });

    // } else {
    //   console.log("Geolocation is not available in this browser.");
    // }
  }, [lat, long]);
  return (
    <GeoContext.Provider value={{ lat, long, setLatitude, setLongitude }}>
      {children}
    </GeoContext.Provider>
  );
};
export { GeoContext, GeoLocationWrapper };
