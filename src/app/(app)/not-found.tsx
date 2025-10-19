import Link from "next/link";
import Logo from "@/components/logo";

export default function NotFound() {
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
        <div className="flex aspect-video flex-col items-center justify-center gap-2 rounded-2xl bg-white">
          <h1 className="text-xl font-bold text-stone-900">404</h1>
          <p className="mb-2 text-sm text-stone-500">
            Could not find requested page
          </p>
          <Link
            href="/"
            className="flex cursor-pointer items-center justify-center rounded-lg bg-stone-900 px-4 py-3 text-sm font-medium text-white outline-offset-2 outline-blue-500 focus-visible:outline-2"
          >
            Return Home
          </Link>
        </div>
      </main>
    </div>
  );
}
