import { useState } from "react";

import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { PlaceDetails } from "./pages/PlaceDetails";
import { WeatherPage } from "./pages/WeatherPage";
import { GeoDetails } from "./components/GeoDetails";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/place-details" element={<PlaceDetails />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/geo/:state" element={<GeoDetails />} />
      </Routes>
    </>
  );
}

export default App;
