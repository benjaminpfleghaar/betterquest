"use client";

import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";
import { LatLngExpression, LatLngTuple } from "leaflet";

const Map = dynamic(() => import("@/components/map"), {
  ssr: false,
});

interface MapContainerProps {
  photo: string;
  position: LatLngExpression | LatLngTuple;
}

export default function MapContainer({ photo, position }: MapContainerProps) {
  const [toggleMap, setToggleMap] = useState(false);

  const photoView = (
    <>
      <Image src={photo} className="object-cover" alt="Photo" priority fill />
      <button
        type="button"
        className="absolute right-6 -bottom-6 flex size-16 cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-white outline-offset-2 outline-blue-500 focus-visible:outline-2"
        onClick={() => setToggleMap(!toggleMap)}
      >
        <Image src="/map-preview.png" width={240} height={240} alt="" />
        <span className="sr-only">Show Map</span>
      </button>
    </>
  );

  const mapView = (
    <>
      <Map position={position} />
      <button
        type="button"
        className="absolute right-6 -bottom-6 flex size-16 cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-white outline-offset-2 outline-blue-500 focus-visible:outline-2"
        onClick={() => setToggleMap(!toggleMap)}
      >
        <Image src={photo} className="object-cover" alt="" fill />
        <span className="sr-only">Show Photo</span>
      </button>
    </>
  );

  return (
    <div className="relative aspect-video bg-stone-200">
      {toggleMap ? mapView : photoView}
    </div>
  );
}
