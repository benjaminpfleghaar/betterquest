import Link from "next/link";
import { Suspense } from "react";
import Logo from "@/components/logo";
import Location from "@/components/location";
import { CirclePlus, Link2, Map, Share2 } from "lucide-react";

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

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="flex min-h-svh flex-col gap-4 bg-stone-100 p-4 lg:gap-16">
      <header className="flex justify-between">
        <Logo variant="default" />
        <Link
          href="/"
          className="flex h-10 w-fit items-center justify-center gap-2 rounded-full bg-stone-900 pr-4 pl-3 text-sm font-medium text-white"
        >
          <CirclePlus size={16} aria-hidden="true" />
          New
        </Link>
      </header>
      <main className="mx-auto w-full max-w-md lg:max-w-lg">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_3rem]">
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg">
            <Suspense
              fallback={
                <div className="flex aspect-square flex-col items-center justify-center gap-2 text-sm font-medium text-stone-900">
                  <div className="size-5 animate-spin rounded-full border-[1.5px] border-current border-e-transparent"></div>
                  Loading...
                </div>
              }
            >
              <Location slug={slug} />
            </Suspense>
          </div>
          <ul className="flex flex-row justify-center gap-2 lg:flex-col lg:justify-start">
            {links.map(({ icon, label, url }) => (
              <li key={label} className="flex items-center gap-2 text-sm">
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
      </main>
    </div>
  );
}
