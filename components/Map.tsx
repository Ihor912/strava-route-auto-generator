"use client";

// START: Preserve spaces to avoid auto-sorting
import "leaflet/dist/leaflet.css";

import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";

import "leaflet-defaulticon-compatibility";
// END: Preserve spaces to avoid auto-sorting
import { MapContainer, Polyline, Popup, TileLayer } from "react-leaflet";
import { Activity } from "@/types/Strava";
import { useEffect } from "react";

export default function Map({
  points,
  location,
}: {
  points: Activity[];
  location: [number, number];
}) {
  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <MapContainer
      preferCanvas={true}
      center={location}
      zoom={11}
      scrollWheelZoom={true}
      style={{ height: "100vh", width: "100vw" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {points.map((activity: Activity) => (
        <Polyline key={activity.id} positions={activity.positions}>
          <Popup>
            <h2>{activity.name}</h2>
          </Popup>
        </Polyline>
      ))}
    </MapContainer>
  );
}
