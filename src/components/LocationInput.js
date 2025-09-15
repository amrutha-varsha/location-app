import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function LocationInput() {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!lat || !lng) {
      alert("Please enter both latitude and longitude.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="card p-4 shadow-sm">
      {/* Input Form */}
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="mb-3">
          <label className="form-label">Latitude</label>
          <input
            type="number"
            className="form-control"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            placeholder="Enter latitude"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Longitude</label>
          <input
            type="number"
            className="form-control"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            placeholder="Enter longitude"
          />
        </div>
        <button type="submit" className="btn btn-success">
          Show on Map
        </button>
      </form>

      {/* Map */}
      <MapContainer
        center={submitted ? [parseFloat(lat), parseFloat(lng)] : [20, 0]} 
        zoom={submitted ? 13 : 2} 
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* Show marker only if coordinates are submitted */}
        {submitted && (
          <Marker position={[parseFloat(lat), parseFloat(lng)]}>
            <Popup>
              📍 Custom Location <br /> Lat: {lat}, Lng: {lng}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

export default LocationInput;
