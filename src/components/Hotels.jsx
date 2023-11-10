import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import hotelsJson2 from "../hotels.json";

export const Hotels = () => {
  const [hotels, setHotels] = useState(null);
  const [hotelsJson, setHotelsJson] = useState(hotelsJson2);

  useEffect(() => {
    axios
      .get("http://localhost:4000/tripadvisor")
      .then((results) => {
        console.log(results.data);

        setHotels(results.data.hotels);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <h2 className="container mt-4">Hotels</h2>

      <div className="container">
        <div className="row">
          {hotels
            ? hotels.map((hotel) => {
                return (
                  <>
                    <div className="container">
                      <div className="row">
                        <p>{hotel.name}</p>
                        <p>
                          {hotel.address.address_string &&
                            hotel.address.address_string}
                        </p>

                        {hotel.data.map((hotelData) => {
                          return (
                            <>
                              {/* <p>{hotelData.id}</p> */}
                              <div className="col-4 mt-4">
                                <img
                                  src={hotelData.images.medium.url}
                                  style={{ width: "150px", height: "150px" }}
                                ></img>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </>
                );
              })
            : hotelsJson &&
              hotelsJson.map((hotel) => {
                return (
                  <>
                    <div className="col-4 mt-4">
                      <div className="card p-3">
                        <img
                          src={hotel.image}
                          style={{ width: "150px", height: "150px" }}
                        ></img>
                        <p>{hotel.name}</p>
                        <p>{hotel.address_string && hotel.address_string}</p>
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
