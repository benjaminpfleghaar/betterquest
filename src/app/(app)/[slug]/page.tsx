import Link from "next/link";
import { Suspense } from "react";
import Logo from "@/components/logo";
import { CirclePlus } from "lucide-react";
import Location from "@/components/location";
import Skeleton from "@/components/skeleton";

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
        <Suspense fallback={<Skeleton />}>
          <Location slug={slug} />
        </Suspense>
      </main>
    </div>
  );
}
