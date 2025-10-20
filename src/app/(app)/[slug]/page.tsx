import Link from "next/link";
import { Suspense } from "react";
import Logo from "@/components/logo";
import Location from "@/components/location";
import Skeleton from "@/components/skeleton";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="p-4 space-y-4 md:space-y-16">
      <header>
        <Link
          href="/"
          className="inline-flex rounded-sm outline-offset-2 outline-blue-500 focus-visible:outline-2"
        >
          <Logo variant="stone" />
        </Link>
      </header>
      <main className="mx-auto w-full max-w-md md:max-w-lg">
        <Suspense fallback={<Skeleton />}>
          <Location slug={slug} />
        </Suspense>
      </main>
    </div>
  );
}
