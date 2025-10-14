import Image from "next/image";
import { jakarta } from "@/lib/fonts";
import MapContainer from "@/components/map-container";

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
    </>
  );
}
