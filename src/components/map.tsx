import "@/styles/leaflet.css";
import { LatLngExpression } from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

interface MapProps {
  position: LatLngExpression;
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
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      <Marker position={position} />
    </MapContainer>
  );
}
