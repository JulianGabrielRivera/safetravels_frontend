import { useState } from "react";

import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { PlaceDetails } from "./pages/PlaceDetails";
import { WeatherPage } from "./pages/WeatherPage";
import { GeoDetails } from "./components/GeoDetails";
import { PhoneSignup } from "./pages/PhoneSignup";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/place-details" element={<PlaceDetails />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/geo/:state" element={<GeoDetails />} />
        <Route path="/phone-number" element={<PhoneSignup />} />
      </Routes>
    </>
  );
}

export default App;
