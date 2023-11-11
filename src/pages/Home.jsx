import React from "react";
// import { Button } from "react-bootstrap";
import costarica from "../costarica.png";
import beach from "../mainbeach.png";
import beachvacation from "../costarica.png";
import { Link } from "react-router-dom";
import "../index.css";
import { useRef, useState, useEffect } from "react";
import { NavBar } from "../components/NavBar";
import geodudes from "../geodudes.json";

export const Home = () => {
  const [places, setPlaces] = useState(geodudes);
  const [search, setSearch] = useState("");
  const [allStates, setAllStates] = useState(null);
  const [filteredStates, setFilteredStates] = useState(null);
  const ref = useRef(null);

  const handleUpClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const states = () => {
    const uniqueCityData = places.filter((place, index, self) => {
      return index === self.findIndex((p) => p.state === place.state);
    });

    const newR = uniqueCityData.map((place) => {
      return { ...place, pic: costarica };
    });
    console.log(newR);
    setAllStates(newR);
    setFilteredStates(newR);
  };

  const filterTheStates = () => {
    const filterArray = allStates.filter((state) => {
      return state.state.toLowerCase().includes(search.toLowerCase());
    });

    setFilteredStates(filterArray);
  };

  useEffect(() => {
    states();
  }, []);

  return (
    <>
      <NavBar />
      <div
        ref={ref}
        className="container position-relative"
        style={{ height: "250px" }}
      >
        <img src={beach} alt="" className="h-100 w-100 " />
        <h1 className="position-absolute top-50 translate-middle start-50 text-white">
          Safe Travels
        </h1>
      </div>
      <section className="">
        <div className="container mt-4 mb-4">
          <nav class="navbar">
            <div class="container-fluid">
              <form class="d-flex" role="search">
                <input
                  class="form-control me-2 "
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(e) => {
                    setSearch(e.target.value);
                    filterTheStates();
                  }}
                  name="search"
                />
                <button class="btn border-white text-black" type="submit">
                  Search
                </button>
              </form>
            </div>
          </nav>
        </div>
      </section>

      <div className="container ">
        <div className="row  ">
          {filteredStates &&
            filteredStates.map((state) => {
              return (
                <>
                  <div className="col-6 ">
                    <div className="card-body">
                      <img src={state.pic} alt="" className="img-fluid w-100" />

                      <h5 className="card-title">{state.state}</h5>
                      <p className="card-text m-0">
                        Population: {state.population}
                      </p>
                      <p className="m-0">
                        Growth:{state.growth_from_2000_to_2013}
                      </p>
                      <Link
                        to={{
                          pathname: `/geo/${state.city}`,
                        }}
                      >
                        {state.city}
                      </Link>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
      <div className="container">
        <div
          class="accordion mt-5 "
          id="accordionPanelsStayOpenExample"
          style={{ height: "550px" }}
        >
          <div class="accordion-item">
            <h2 class="accordion-header" id="panelsStayOpen-headingOne">
              <button
                class="accordion-button bg-info text-white"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseOne"
                aria-expanded="true"
                aria-controls="panelsStayOpen-collapseOne"
              >
                Vacation Spots
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseOne"
              class="accordion-collapse collapse show"
              aria-labelledby="panelsStayOpen-headingOne"
            >
              <ul class="list-group">
                <li class="list-group-item">North America Vacations</li>
                <li class="list-group-item">South America Vacations</li>
                <li class="list-group-item">Europe Vacations</li>
                <li class="list-group-item">Asia Vacations</li>
              </ul>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
              <button
                class="accordion-button collapsed bg-info text-white"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseTwo"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapseTwo"
              >
                Airlines
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseTwo"
              class="accordion-collapse collapse"
              aria-labelledby="panelsStayOpen-headingTwo"
            >
              <ul class="list-group">
                <Link class="list-group-item">American Airlines</Link>
                <li class="list-group-item">Delta Airlines</li>
                <li class="list-group-item">Spirit Airlines</li>
                <li class="list-group-item">Southwest Airlines</li>
                <li class="list-group-item">Frontier Airlines</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <button
        className="w-100 bg-info border-0 text-white fixed-bottom "
        style={{ height: "60px" }}
        onClick={handleUpClick}
      >
        Go Back Up
      </button>
    </>
  );
};
