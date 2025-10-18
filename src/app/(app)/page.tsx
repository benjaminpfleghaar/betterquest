import Image from "next/image";
import Form from "@/components/form";
import Logo from "@/components/logo";
import { Camera, Share2, Upload } from "lucide-react";

const usps = [
  {
    icon: Camera,
    label: "Snap a photo with GPS turned on",
  },
  {
    icon: Upload,
    label: "Upload it to generate your shareable link",
  },
  {
    icon: Share2,
    label: "Share it with your riding group",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-svh items-start justify-center p-4 lg:items-center">
      <div className="fixed inset-0 -z-10 bg-teal-950">
        <Image
          src="/forest.jpg"
          className="object-cover"
          alt="Photo of a path leading through a forest"
          placeholder="blur"
          blurDataURL="/forest-blur.jpg"
          fill
        />
      </div>
      <div className="grid w-full max-w-sm grid-cols-1 gap-6 lg:max-w-4xl lg:grid-cols-[22rem_1fr] lg:gap-12">
        <aside>
          <Form />
        </aside>
        <section
          aria-label="Keep your trails safe by reporting issues"
          className="order-first pt-0 text-white lg:order-none lg:pt-4"
        >
          <Logo variant="destructive" className="mb-4" />
          <h1 className="mb-6 text-4xl font-bold lg:text-5xl">
            Keep your trails safe by reporting issues
          </h1>
          <h2 className="mb-6">
            Upload a photo with GPS info to create a shareable link. Help riders
            stay informed about trail conditions and potential hazards.
          </h2>
          <ol className="space-y-2">
            {usps.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm">
                <Icon size={16} />
                {label}
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}
