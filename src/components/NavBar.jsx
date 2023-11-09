import React from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";

export const NavBar = () => {
  const ref = useRef(null);
  return (
    <div className="container" ref={ref}>
      <div
        class="collapse"
        id="navbarToggleExternalContent"
        // data-bs-theme="dark"
      >
        <div class="bg-dark p-4 d-flex flex-column  ">
          <Link to="/" className="text-white text-decoration-none">
            Home
          </Link>
          <Link className="text-white text-decoration-none">Places</Link>
          {/* 
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    > */}
          <Link
            className="text-white text-decoration-none"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            {" "}
            Deals
          </Link>
          <Link to="/place-details" className="text-white text-decoration-none">
            My Location
          </Link>

          {/* </button> */}

          <div
            class="modal fade "
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog beachVacation  text-black">
              <div
                class="modal-content bg-transparent "
                style={{ height: "350px" }}
              >
                <div class="modal-header">
                  <h1 class="modal-title fs-4" id="exampleModalLabel">
                    Safe Travels!
                  </h1>
                  <button
                    type="button"
                    class="btn-close "
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body ">
                  <div className="container h-100  ">
                    <div className="row h-100 align-content-around justify-content-center">
                      {/* <div className="col-6">Get Your Free Travel Guide</div> */}
                      <h1>Get Your Free Travel Guide</h1>
                      <h5 className="w-75 p-0">
                        {" "}
                        Learn everything you need to know to plan for your next
                        trip
                      </h5>
                      {/* <div className="col-12">
                  Learn everything you need to know to plan for your
                  next trip
                </div> */}

                      {/* <input
                    type="text"
                    className="w-100 bg-white border-0 h-100 p-2 "
                    placeholder="Enter Your Email"
                  /> */}

                      <div
                        style={{ height: "40px" }}
                        class="form-floating mb-3 justify-content-center w-75 p-0"
                      >
                        <input
                          type="email"
                          class="form-control w-100  border-0 h-100 p-2 "
                          id="floatingInput"
                          placeholder="name@example.com"
                        />
                        <label for="floatingInput" className="bg-transparent">
                          Email address
                        </label>
                      </div>
                      <div
                        style={{ height: "40px" }}
                        className="justify-content-center w-75 p-0"
                      >
                        <button className="w-100 bg-info border-0 h-100 fs-4">
                          Get My Free Guide
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="navbar navbar-dark ">
        <div class="container-fluid">
          <button
            class="navbar-toggler "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
    </div>
  );
};
