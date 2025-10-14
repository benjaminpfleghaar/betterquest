"use client";

import "leaflet/dist/leaflet.css";
import { LatLngExpression, LatLngTuple } from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

interface MapProps {
  position: LatLngExpression | LatLngTuple;
}

export default function Map({ position }: MapProps) {
  return (
    <MapContainer
      zoom={13}
      center={position}
      zoomControl={false}
      className="z-0 size-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} />
    </MapContainer>
  );
}
