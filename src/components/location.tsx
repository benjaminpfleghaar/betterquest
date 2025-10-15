import { cn } from "@/lib/utils";
import { jakarta } from "@/lib/fonts";
import SocialLinks from "@/components/social-links";
import MapContainer from "@/components/map-container";
import { Axe, CircleQuestionMark, Construction, Trash2 } from "lucide-react";

const issue = {
  blocked: {
    title: "Trail is blocked",
    background: "bg-orange-400",
    icon: (
      <Construction strokeWidth={1.5} aria-hidden="true" className="absolute" />
    ),
  },
  modified: {
    title: "Trail is modified",
    background: "bg-blue-400",
    icon: <Axe strokeWidth={1.5} aria-hidden="true" className="absolute" />,
  },
  destroyed: {
    title: "Trail is destroyed",
    background: "bg-red-400",
    icon: <Trash2 strokeWidth={1.5} aria-hidden="true" className="absolute" />,
  },
  other: {
    title: "Other issue",
    background: "bg-stone-400",
    icon: (
      <CircleQuestionMark
        strokeWidth={1.5}
        aria-hidden="true"
        className="absolute"
      />
    ),
  },
};

export default async function Location({ slug }: { slug: string }) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const { title, background, icon } = issue["blocked"];

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
            <div className="grid grid-cols-[3rem_1fr] items-center gap-3 pl-1">
              <div className="flex size-10 items-center justify-center text-white">
                <div
                  className={cn(
                    "absolute size-10 rotate-45 rounded-lg",
                    background,
                  )}
                ></div>
                {icon}
              </div>
              <div>
                <h1 className={`${jakarta.className} font-bold`}>{title}</h1>
                <h2 className="text-xs text-stone-600">2 days ago</h2>
              </div>
            </div>
            <p className="text-sm text-stone-600">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua.
            </p>
          </div>
        </div>
        <SocialLinks
          lat={49.177902777777774}
          lon={9.285983333333332}
          issue={title}
        />
      </div>
    </>
  );
}
