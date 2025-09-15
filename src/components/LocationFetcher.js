import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix for missing default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function LocationFetcher() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  // ✅ Auto-fetch location when component mounts
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setError(null);
      },
      (err) => {
        setError("Unable to fetch location: " + err.message);
        setLocation(null);
      }
    );
  }, []);

  return (
    <div className="card p-4 shadow-sm">
      {location && (
        <>
          <div className="alert alert-success">
            <h5>✅ Location Fetched!</h5>
            <p><strong>Latitude:</strong> {location.latitude}</p>
            <p><strong>Longitude:</strong> {location.longitude}</p>
          </div>

          {/* Default map always visible */}
          <MapContainer
            center={[location.latitude, location.longitude]}
            zoom={13}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <Marker position={[location.latitude, location.longitude]}>
              <Popup>
                📍 You are here! <br /> Lat: {location.latitude}, Lng: {location.longitude}
              </Popup>
            </Marker>
          </MapContainer>
        </>
      )}

      {error && (
        <div className="alert alert-danger">
          <h5>⚠️ Error</h5>
          <p>{error}</p>
        </div>
      )}

      {!location && !error && (
        <p className="text-muted">Fetching your location...</p>
      )}
    </div>
  );
}

export default LocationFetcher;
