import React, { useState } from "react";
import LocationFetcher from "./components/LocationFetcher";
import LocationInput from "./components/LocationInput";

function App() {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">🌍 Location App</h2>

      {/* Bootstrap Nav Tabs */}
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "tab1" ? "active" : ""}`}
            onClick={() => setActiveTab("tab1")}
          >
            Current Location
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "tab2" ? "active" : ""}`}
            onClick={() => setActiveTab("tab2")}
          >
            Enter Coordinates
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      <div>
        {activeTab === "tab1" && <LocationFetcher />}
        {activeTab === "tab2" && <LocationInput />}
      </div>
    </div>
  );
}

export default App;
