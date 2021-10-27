import React from "react";

import Settings from "./Components/Settings";

import "./CSS/Homepage.css";

function Homepage() {
  return (
    <div className="container homepage">
      <Settings />
      <h1 className="homepage-title">Crypto Price Tracker</h1>
    </div>
  );
}

export default Homepage;
