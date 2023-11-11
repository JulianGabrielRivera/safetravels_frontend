import React from "react";

import axios from "axios";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import restaurantsFromJson from "../restaurants.json";
import coffeeFromJson from "../coffees.json";

import { useState, useRef, useEffect } from "react";
export const CurrentLocationMap = ({ lat, long }) => {
  const google = window.google;
  const [restaurantsJson, setRestaurantsJson] = useState(restaurantsFromJson);

  const [coffeesJson, setCoffeesJson] = useState(coffeeFromJson);
  const [restaurantArray, setRestaurantArray] = useState([]);
  const [cafeArray, setCafeArray] = useState([]);

  const [restaurantPhotos, setRestaurantPhotos] = useState(null);

  console.log(restaurantArray);
  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${import.meta.env.VITE_APP_Google_key}`,
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [directionsResponse, setDirectionsResponse] = useState(null);

  const originRef = useRef("");
  const destinationRef = useRef("");

  const calculateRoute = async () => {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }

    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    console.log(directionsService);
    console.log(results);
    setDirectionsResponse(results);

    // setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  };

  const getRestaurantsAndCafes = (lat, long) => {
    axios
      .post("http://localhost:4000/google", {
        lat: lat,
        lng: long,
      })
      .then((results) => {
        const restaurants = results.data.photos.map((photo, i) => {
          return {
            photo: photo,
            name: results.data.names[i],
            ratings: results.data.overallRating[i],
            userRatings: results.data.userRatings[i],
          };
        });

        setRestaurantArray(restaurants);
        console.log(results);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .post("http://localhost:4000/google/cafe", {
        lat: lat,
        lng: long,
      })
      .then((results) => {
        console.log(results);
        const cafes = results.data.photos.filter(
          (cafe) => typeof cafe === "string"
        );
        const newCafeArray = results.data.cafeNames.map((cafe, i) => {
          return { ...cafe, photo: cafes[i] };
        });
        console.log(cafes);
        console.log(newCafeArray);
        setCafeArray(newCafeArray);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const center = {
    lat: lat,
    lng: long,
  };
  useEffect(() => {
    if (lat !== null && long !== null) {
      getRestaurantsAndCafes(lat, long);
    }
  }, [lat, long]);

  return (
    <>
      <div className="container mt-4  ">
        <div className="row ">
          <div className="col-sm-12 col-md-4 pe-md-0">
            {google && isLoaded && (
              <Autocomplete>
                <input
                  type="text"
                  placeholder="Origin"
                  ref={originRef}
                  className="w-100"
                />
              </Autocomplete>
            )}
          </div>
          <div className="col-sm-12 col-md-4 pe-md-0 ps-md-0">
            {google && isLoaded && (
              <Autocomplete>
                <input
                  type="text"
                  placeholder="Destination"
                  ref={destinationRef}
                  className="w-100"
                />
              </Autocomplete>
            )}
          </div>
          <div className="col-sm-12 col-md-4  ps-md-0 ">
            <button
              className="w-100 bg-info text-white border-white"
              onClick={google && calculateRoute}
            >
              Take Me There!
            </button>
          </div>

          {/* <button className="col-3 p-0">go</button> */}
        </div>
      </div>
      <div className="container ">
        <div className="row align-items-center">
          <p className="col-6 m-0">
            {" "}
            Durations: {duration ? duration : "0 Minutes"}
          </p>
          <div className="col-6">
            <button
              className="w-100 bg-info text-white border-white"
              onClick={() => {
                map.panTo(center);
              }}
            >
              center
            </button>
          </div>
        </div>
      </div>
      <div className="container">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            // onLoad={onLoad}
            onLoad={(map) => setMap(map)}
            // onUnmount={onUnmount}
          >
            <MarkerF position={center} />
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
            {/* Child components, such as markers, info windows, etc. */}
          </GoogleMap>
        ) : (
          <></>
        )}
      </div>

      <div className="container mt-4">
        <div className="row">
          {restaurantArray.length > 0
            ? restaurantArray.map((restaurant) => {
                return (
                  <>
                    <div className="col-4 mt-4 ">
                      <div className="card p-3">
                        <img src={restaurant.photo} alt="" height={200} />
                        <h3 className="fs-6">{restaurant.name}</h3>
                        <p>Rating: {restaurant.ratings}</p>
                        <p>Total User Ratings: {restaurant.userRatings}</p>
                      </div>
                    </div>
                  </>
                );
              })
            : restaurantsJson?.map((restaurant) => {
                return (
                  <div className="col-4 mt-4 " key={restaurant.id}>
                    <div className="card p-3">
                      <img src={restaurant.image} alt="" height={200} />
                      <h3 className="fs-6">{restaurant.name}</h3>
                      <p>{restaurant.cuisine}</p>
                      <p>Rating: {restaurant.ratings}</p>
                      <p>Total User Ratings: {restaurant.userRatings}</p>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>

      <div className="container">
        <h2 className="container mt-4 p-0">Cafecitos</h2>
      </div>

      <div className="container mt-4">
        <div className="row">
          {cafeArray.length > 0
            ? cafeArray.map((cafePhoto) => {
                return (
                  <>
                    <div className="col-4 mt-4">
                      <div className="card p-3">
                        <img src={cafePhoto.icon} alt="" width={50} />
                        <img src={cafePhoto.photo} height={200} />
                        <h2>
                          {cafePhoto.name}
                          <span> {cafePhoto.rating}</span>
                        </h2>
                        <p>{cafePhoto.vicinity}</p>
                      </div>
                    </div>
                  </>
                );
              })
            : coffeesJson?.map((cafePhoto) => {
                return (
                  <>
                    <div className="col-4 mt-4">
                      <div className="card p-3">
                        <img src={cafePhoto.icon} alt="" width={50} />
                        <img src={cafePhoto.photo} height={200} />
                        <h2>{cafePhoto.name}</h2>
                        <p> Rating: {cafePhoto.rating}</p>

                        <p>Address: {cafePhoto.vicinity}</p>
                      </div>
                    </div>
                  </>
                );
              })}
        </div>
      </div>
    </>
  );
};
export default CurrentLocationMap;
