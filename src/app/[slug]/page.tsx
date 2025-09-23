import exifr from "exifr";
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
  const supabase = await createClient();
  const { slug } = await params;

  const { data: location, error } = await supabase
    .from("locations")
    .select("slug, image")
    .eq("slug", slug)
    .single();

  if (error) notFound();

  const { data: file } = supabase.storage
    .from("images")
    .getPublicUrl(location.image);

  const response = await fetch(file.publicUrl);

  if (!response.ok) notFound();

  const gpsData = await exifr.gps(file.publicUrl);

  return (
    <>
      <div className="relative w-48 h-48">
        <Image
          src={file.publicUrl}
          alt="Preview image"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      {gpsData ? <MapLocation {...gpsData} /> : null}
    </>
  );
}
