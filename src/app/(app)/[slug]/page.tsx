import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase";
import CopyButton from "@/components/copy-button";
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

  const { data: location, error: locationError } = await supabase
    .from("locations")
    .select("image, latitude, longitude")
    .eq("slug", slug)
    .single();

  if (locationError || !location) {
    notFound();
  }

  const { data: storage, error: storageError } = await supabase.storage
    .from("images")
    .createSignedUrl(location.image, 60);

  if (storageError || !storage) {
    notFound();
  }

  return (
    <>
      <div className="relative w-48 h-48">
        <Image
          src={storage.signedUrl}
          alt="Preview image"
          className="object-cover"
          fill
        />
      </div>
      <MapLocation
        latitude={location.latitude}
        longitude={location.longitude}
      />
      <CopyButton slug={slug} />
    </>
  );
}
