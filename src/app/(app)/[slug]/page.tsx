import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase";
import MapLocation from "@/components/map-location";

export const metadata: Metadata = {
  title: "Location",
  description: "Lorem ipsum dolor sit amet",
};

export default async function Location({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const supabase = await createClient();

  const { data: location, error } = await supabase
    .from("locations")
    .select("image, latitude, longitude")
    .eq("slug", slug)
    .single();

  if (error || !location) notFound();

  const { data: file } = supabase.storage
    .from("images")
    .getPublicUrl(location.image);

  const response = await fetch(file.publicUrl);
  if (!response.ok) notFound();

  return (
    <>
      <div className="relative w-48 h-48">
        <Image
          src={file.publicUrl}
          alt="Preview image"
          className="object-cover"
          fill
        />
      </div>
      <MapLocation
        latitude={location.latitude}
        longitude={location.longitude}
      />
    </>
  );
}
