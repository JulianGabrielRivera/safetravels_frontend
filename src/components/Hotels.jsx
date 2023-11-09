import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

export const Hotels = () => {
  const [hotels, setHotels] = useState(null);
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
        {hotels &&
          hotels.map((hotel) => {
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
                          <div className="col-4">
                            <img
                              src={hotelData.images.medium.url}
                              style={{ width: "150px", height: "150px" }}
                            ></img>
                          </div>
                        </>
                      );
                    })}
                    {/* <div className="col-4">
            <div className="card p-3">
              <img src={hotel.photo} alt="" height={200} />
              <h3 className="fs-6">{restaurant.name}</h3>
              <p>Rating: {restaurant.ratings}</p>
              <p>Total User Ratings: {restaurant.userRatings}</p>
            </div>
          </div> */}
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};
