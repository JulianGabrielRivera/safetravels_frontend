import React from "react";
import { createContext, useState, useEffect } from "react";
import restaurantsFromJson from "../restaurants.json";
import coffeeFromJson from "../coffees.json";
const GeoContext = createContext();

const GeoLocationWrapper = ({ children }) => {
  const [lat, setLatitude] = useState(null);
  const [long, setLongitude] = useState(null);
  const [restaurantsJson, setRestaurantsJson] = useState(restaurantsFromJson);

  const [coffeesJson, setCoffeesJson] = useState(coffeeFromJson);
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
    <GeoContext.Provider
      value={{
        lat,
        long,
        setLatitude,
        setLongitude,
        restaurantsJson,
        coffeesJson,
      }}
    >
      {children}
    </GeoContext.Provider>
  );
};
export { GeoContext, GeoLocationWrapper };
