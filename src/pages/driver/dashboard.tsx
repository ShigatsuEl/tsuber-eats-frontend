import React from "react";
import GoogleMapReact from "google-map-react";

export const Dashboard = () => {
  return (
    <div>
      <div
        className="overflow-hidden"
        style={{ width: window.innerWidth, height: "85vh" }}
      >
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCd6qBYXKaEb7TNIKZyWooyY-teIR4ozsA" }}
          defaultZoom={20}
          defaultCenter={{ lat: 59.95, lng: 30.33 }}
        >
          <h1>hello</h1>
        </GoogleMapReact>
      </div>
    </div>
  );
};
