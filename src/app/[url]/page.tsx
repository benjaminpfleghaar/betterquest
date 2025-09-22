import type { Metadata } from "next";
import { createClient } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Location",
  description: "Lorem ipsum dolor sit amet",
};

export default async function Location({
  params,
}: {
  params: Promise<{ url: string }>;
}) {
  const supabase = await createClient();
  const { url } = await params;

  const { data: link, error } = await supabase
    .from("links")
    .select("url, image")
    .eq("url", url)
    .single();

  if (error || !link) return;

  return <div>My Image: {JSON.stringify(link.image)}</div>;
}
