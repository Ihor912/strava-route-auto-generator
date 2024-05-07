"use client";

// START: Preserve spaces to avoid auto-sorting
import "leaflet/dist/leaflet.css";

import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";

import "leaflet-defaulticon-compatibility";
// END: Preserve spaces to avoid auto-sorting
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { MapPoint } from "@/types/MapPoint";

export default function Map({ pointsData }: { pointsData: MapPoint }) {
  return (
    <MapContainer
      preferCanvas={true}
      center={[51.505, -0.09]}
      zoom={11}
      scrollWheelZoom={true}
      style={{ height: "100vh", width: "100vw" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {pointsData.map((point: MapPoint) => (
        <Marker
          key={point.id}
          position={[point.gps.latitude, point.gps.longitude]}
        >
          <Popup>
            This Marker icon is displayed correctly with{" "}
            <i>leaflet-defaulticon-compatibility</i>.
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
