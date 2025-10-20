"use client";

import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";
import { LatLngExpression } from "leaflet";
import ToggleButton from "@/components/toggle-button";

const Map = dynamic(() => import("@/components/map"), {
  ssr: false,
});

interface MapContainerProps {
  photo: string;
  position: LatLngExpression;
}

export default function MapContainer({ photo, position }: MapContainerProps) {
  const [toggleMap, setToggleMap] = useState(false);

  const photoView = (
    <>
      <Image src={photo} className="object-cover" fill alt="Location photo" />
      <ToggleButton
        onClick={() => setToggleMap(true)}
        img="/map-preview.png"
        label="Show Map"
      />
    </>
  );

  const mapView = (
    <>
      <Map position={position} />
      <ToggleButton
        onClick={() => setToggleMap(false)}
        img={photo}
        label="Show Photo"
      />
    </>
  );

  return (
    <div className="relative aspect-video bg-stone-100">
      {toggleMap ? mapView : photoView}
    </div>
  );
}
