import Image from "next/image";
import Form from "@/components/form";
import Logo from "@/components/logo";

export default function Home() {
  return (
    <main className="flex min-h-svh items-center justify-center p-4">
      <div className="grid w-full max-w-sm grid-cols-1 gap-4 md:max-w-3xl md:grid-cols-2">
        <Form />
        <div className="relative flex flex-col justify-between gap-8 overflow-hidden rounded-2xl p-8">
          <Image
            src="/forest.jpg"
            className="-z-10 bg-teal-950 object-cover"
            alt="Photo of a path leading through a forest"
            placeholder="blur"
            blurDataURL="/forest-blur.jpg"
            fill
          />
          <div className="space-y-6">
            <Logo variant="lime" />
            <h1 className="text-4xl font-bold text-white">
              Keep your trails safe & healthy
            </h1>
          </div>
          <div className="space-y-1">
            <h2 className="text-xs font-bold text-white">How it works</h2>
            <p className="text-sm text-white">
              Upload a photo with GPS enabled to create a shareable link. Help
              riders stay informed about trail conditions and potential hazards.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
