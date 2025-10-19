import SocialLinks from "@/components/social-links";
import MapContainer from "@/components/map-container";
import { Axe, CircleQuestionMark, Construction, Trash2 } from "lucide-react";

const type = {
  blocked: {
    issue: "Trail is blocked",
    icon: Construction,
  },
  modified: {
    issue: "Trail is modified",
    icon: Axe,
  },
  destroyed: {
    issue: "Trail is destroyed",
    icon: Trash2,
  },
  other: {
    issue: "Other issue",
    icon: CircleQuestionMark,
  },
};

export default async function Location({ slug }: { slug: string }) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const { issue, icon: Icon } = type["blocked"];

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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_3rem]">
      <div className="relative overflow-hidden rounded-2xl bg-white">
        <MapContainer
          photo="/forest.jpg"
          position={[49.177902777777774, 9.285983333333332]}
        />
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-[3rem_1fr] items-center gap-3 pl-1">
            <div className="flex size-10 items-center justify-center text-white">
              <div className="absolute size-10 rotate-45 rounded-lg bg-amber-500"></div>
              <Icon strokeWidth={1.5} className="absolute" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-stone-900">{issue}</h1>
              <h2 className="text-xs text-stone-500">2 days ago</h2>
            </div>
          </div>
          <p className="text-sm text-stone-500">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua.
          </p>
        </div>
      </div>
      <SocialLinks
        lat={49.177902777777774}
        lon={9.285983333333332}
        issue={issue}
      />
    </div>
  );
}
