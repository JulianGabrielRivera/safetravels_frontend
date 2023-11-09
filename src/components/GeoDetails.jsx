import React from "react";
import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import geodudes from "../geodudes.json";
import { GeoContext } from "../context/Geolocation";
import costarica from "../costarica.png";
import { GoogleMaps } from "../pages/GoogleMaps";
import { NavBar } from "../components/NavBar";
import { Hotels } from "../components/Hotels";
import axios from "axios";

export const GeoDetails = () => {
  const { state } = useParams();
  const [states, setStates] = useState(null);
  const [places, setPlaces] = useState(geodudes);

  const [weatherStats, setWeatherStats] = useState({
    myLocation: "",
    where: "",
    feelsLike: null,
    temp: null,
    tempMax: null,
    tempMin: null,
    weatherLogo: "",
  });
  const currentState = state;

  const { lat, long, setLatitude, setLongitude } = useContext(GeoContext);
  const newStates = () => {
    const uniqueCityData = places.filter((place, index, self) => {
      return index === self.findIndex((p) => p.state === place.state);
    });

    const newR = uniqueCityData.map((place) => {
      return { ...place, pic: costarica };
    });
    console.log(newR);
    const statenew = newR.filter((state) => {
      return state.city === currentState;
    });

    setLatitude(statenew[0].latitude);
    setLongitude(statenew[0].longitude);
    setStates(newR);
  };

  const todaysWeather = (lat, long) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${
          import.meta.env.VITE_APP_WEATHER_KEY
        }&units=imperial`
      )
      .then((results) => {
        setWeatherStats((prev) => ({
          ...prev,
          myLocation: results.data.name,
          where: results.data.sys.country,
          feelsLike: results.data.main.feels_like,
          temp: results.data.main.temp,
          tempMax: results.data.main.temp_max,
          tempMin: results.data.main.temp_min,
          weatherLogo: results.data.weather[0].icon,
        }));
      });
  };

  useEffect(() => {
    newStates();
    if (!todaysWeather(lat, long)) {
      todaysWeather(lat, long);
    }
  }, [lat, long]);


  return (
    <>
      <NavBar />
      <div className="container mt-4">
        <div className="row">
          <div className="col-6">
            <img src={costarica} alt="" className="img-fluid" />

            <h2 className="mt-3">{weatherStats.myLocation}</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
          <div className="col-6">
            <div class="card bg-dark text-white">
              {/* <img src="..." class="card-img-top" alt="..." /> */}
              <div class="card-body">
                <h5 class="card-title">
                  Todays weather{" "}
                  <span>
                    {" "}
                    <img
                      src={`http://openweathermap.org/img/w/${weatherStats.weatherLogo}.png`}
                      alt=""
                    />
                  </span>
                </h5>
                <p class="card-text">{weatherStats.where}</p>

                <p class="card-text"> feels like: {weatherStats.feelsLike}</p>
                <p class="card-text"> temperature: {weatherStats.temp}</p>
                <p class="card-text"> temp high: {weatherStats.tempMax}</p>
                <p class="card-text"> temp low: {weatherStats.tempMin}</p>
                <button type="button" class="btn btn-primary">
                  {" "}
                  <Link
                    to="/weather"
                    className="text-decoration-none text-white"
                  >
                    See Forecast
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <div className="row align-items-center justify-content-around">
          <div className="col-2 p-0">Overall</div>
          <div class="progress col-9 p-0">
            <div
              class="progress-bar bg-success"
              role="progressbar"
              aria-valuenow="0"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: "75%" }}
            ></div>
          </div>
          {/* <div className="col">Cost</div>
        <div className="col">Internet</div>
        <div className="col">Fun</div>
        <div className="col">Safety</div> */}
        </div>
        <div className="row align-items-center justify-content-around">
          <div className="col-2 p-0">Cost</div>
          <div class="progress col-9 p-0">
            <div
              class="progress-bar"
              role="progressbar"
              aria-valuenow="0"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: "35%" }}
            ></div>
          </div>
        </div>
        <div className="row align-items-center justify-content-around">
          <div className="col-2 p-0">Internet</div>
          <div class="progress col-9 p-0">
            <div
              class="progress-bar"
              role="progressbar"
              aria-valuenow="0"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: "55%" }}
            ></div>
          </div>
        </div>
        <div className="row align-items-center justify-content-around">
          <div className="col-2 p-0">Fun</div>
          <div class="progress col-9 p-0">
            <div
              class="progress-bar "
              role="progressbar"
              aria-valuenow="0"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: "45%" }}
            ></div>
          </div>
        </div>
        <div className="row align-items-center justify-content-around">
          <div className="col-2 p-0">Safety</div>
          <div class="progress col-9 p-0">
            <div
              class="progress-bar bg-danger"
              role="progressbar"
              aria-valuenow="0"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: "25%" }}
            ></div>
          </div>
        </div>
      </div>
      <GoogleMaps />

      <Hotels />
    </>
  );
};
