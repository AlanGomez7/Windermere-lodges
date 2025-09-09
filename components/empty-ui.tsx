import Link from "next/link";

export default function EmptyList() {
  return (
    <main className="grid place-items-center py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        {/* <p className="text-base font-semibold text-emerald-400">404</p> */}
        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-balance text-black sm:text-4xl">
          Hey! you have no orders yet
        </h1>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/our-lodges"
            className="rounded-md px-3.5 py-2.5 text-lg text-black  shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            View our lodges <span aria-hidden="true">&rarr;</span>
          </Link>
          {/* <a
            href="/contact"
            className="text-sm font-semibold text-emerald-500 border border-emerald-500 px-3.5 py-2.5 rounded-md"
          >
            Contact support <span aria-hidden="true">&rarr;</span>
          </a> */}
        </div>
      </div>
    </main>
  );
}
