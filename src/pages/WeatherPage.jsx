import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { GeoContext } from "../context/Geolocation";
import { NavBar } from "../components/NavBar";

export const WeatherPage = () => {
  const [city, setCity] = useState("");
  const [population, setPopulation] = useState(null);
  const [forecastArray, setForeCastArray] = useState(null);
  const [colorShuffleArray, setColorShuffleArray] = useState(null);

  const { lat, long } = useContext(GeoContext);

  const colorArray = [
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
  ];
  console.log(import.meta.env);
  const getForeCast = (lat, long) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=imperial&appid=${
          import.meta.env.VITE_APP_WEATHER_KEY
        }`
      )
      .then((results) => {
        console.log(results.data);
        setCity(results.data.city.name);
        setPopulation(results.data.city.population);
        setForeCastArray(results.data.list);
        setColorShuffleArray(colorArray);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(forecastArray);

  useEffect(() => {
    getForeCast(lat, long);
  }, []);
  const ref = useRef(null);

  return (
    <div>
      <NavBar />
      <h2 className="text-center">Hows the Weather in {city}?</h2>
      <p className="text-center">Area population : {population} </p>

      <div className="container ">
        <div className="row">
          {forecastArray &&
            forecastArray.map((weather, i) => {
              console.log(weather, i);
              const date = new Date(weather.dt_txt);
              const options = {
                weekday: "long",
                month: "long",
                day: "numeric",
                hour: "numeric",
              };
              const formattedDate = date.toLocaleDateString("en-US", options);
              console.log(formattedDate);
              return (
                <>
                  <div className="col-3 ">
                    <div
                      className={`card mt-2 bg-${
                        colorShuffleArray[
                          Math.floor(Math.random() * colorShuffleArray.length)
                        ]
                      }`}
                    >
                      <h2 className="fs-6 fw-bold m-3">{formattedDate}</h2>
                      <div className="card-body">
                        <img
                          src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                          alt=""
                        />
                        <p>Feels like: {weather.main.feels_like}</p>
                        <p>Temperature: {weather.main.temp}</p>

                        <p>{weather.weather[0].description}</p>
                        <p>{weather.weather[0].main}</p>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
};
