import Image from "next/image";
import Form from "@/components/form";
import { jakarta } from "@/lib/fonts";
import { Camera, Share2, Upload } from "lucide-react";

const usps = [
  {
    icon: <Camera size={16} />,
    label: "Take a photo with GPS enabled",
  },
  {
    icon: <Upload size={16} />,
    label: "Upload the photo to get a shareable link",
  },
  {
    icon: <Share2 size={16} />,
    label: "Share the link with your riding group",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-[url(/forest.jpg)] bg-cover bg-center p-6">
      <div className="w-full max-w-sm lg:max-w-4xl">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[352px_auto] lg:gap-12">
          <Form />
          <div className="order-first pt-0 text-white lg:order-none lg:pt-4">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-red-500">
                <Image src="/logo.svg" width={22} height={20} alt="" />
              </div>
              <p
                className={`${jakarta.className} text-xl font-bold tracking-tighter`}
              >
                betterquest
              </p>
            </div>
            <h1
              className={`${jakarta.className} mb-6 text-4xl font-bold lg:text-5xl`}
            >
              Keep your trails safe by reporting issues
            </h1>
            <h2 className="mb-6">
              Upload a trail photo to generate a shareable link with gps
              location data and details, helping riders stay updated on trail
              conditions.
            </h2>
            <ul className="space-y-2">
              {usps.map(({ icon, label }) => (
                <li key={label} className="flex items-center gap-2 text-sm">
                  {icon}
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
