"use client";

import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";
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
      <Image
        src={photo}
        alt="Preview photo"
        className="object-cover"
        priority
        fill
      />
      <button
        type="button"
        className="absolute right-6 -bottom-6 flex size-16 cursor-pointer items-center justify-center rounded-lg border-2 border-white bg-emerald-50 text-stone-900"
        onClick={() => setToggleMap(!toggleMap)}
      >
        <MapPin size={16} />
        <span className="sr-only">Show Map</span>
      </button>
    </>
  );

  const mapView = (
    <>
      <Map position={position} />
      <button
        type="button"
        className="absolute right-6 -bottom-6 flex size-16 cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-white bg-stone-200"
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
