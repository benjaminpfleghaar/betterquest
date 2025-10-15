import Image from "next/image";
import { jakarta } from "@/lib/fonts";
import { Link2, Map, Share2 } from "lucide-react";
import MapContainer from "@/components/map-container";
import Link from "next/link";

const links = [
  {
    icon: <Share2 size={16} aria-hidden="true" />,
    label: "Share Link",
    url: "/",
  },
  {
    icon: <Map size={16} aria-hidden="true" />,
    label: "Open Map",
    url: "/",
  },
  {
    icon: <Link2 size={16} aria-hidden="true" />,
    label: "Copy Link",
    url: "/",
  },
];

export default async function Location({ slug }: { slug: string }) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  /*  const supabase = await createClient();

  const { data: location, error: locationError } = await supabase
    .from("locations")
    .select("image, latitude, longitude, description")
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
  }*/

  return (
    <>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_3rem]">
        <div className="relative overflow-hidden rounded-2xl border border-stone-200 bg-white">
          <MapContainer
            photo="/forest.jpg"
            position={[49.177902777777774, 9.285983333333332]}
          />
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-[3rem_1fr] items-center gap-4">
              <Image src="/sign.svg" width={48} height={48} alt="" />
              <div>
                <h1 className={`${jakarta.className} font-bold`}>
                  Trail is blocked
                </h1>
                <h2 className="text-sm text-stone-600">2 days ago</h2>
              </div>
            </div>
            <p className="text-sm text-stone-600">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore
            </p>
          </div>
        </div>
        <ul className="flex flex-row justify-center gap-2 lg:flex-col lg:justify-start">
          {links.map(({ icon, label, url }) => (
            <li key={label} className="flex items-center gap-2">
              <Link
                href={url}
                className="flex size-12 items-center justify-center rounded-full border border-stone-200 bg-white"
              >
                {icon}
                <span className="sr-only">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
