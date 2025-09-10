import Link from "next/link";

export default function UserNotFound() {
  return (
    <main className="grid min-h-full place-items-center  px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        {/* <p className="text-base font-semibold text-emerald-400">404</p> */}
        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-balance text-emerald-200 sm:text-7xl">
          You are not logged in!
        </h1>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/auth/login"
            className="rounded-md bg-emerald-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Please Login  <span aria-hidden="true">&rarr;</span>
          </Link>
          {/* <a href="/contact" className="text-sm font-semibold text-emerald-500 border border-emerald-500 px-3.5 py-2.5 rounded-md">
            Contact support <span aria-hidden="true">&rarr;</span>
          </a> */}
        </div>
      </div>
    </main>
  );
}
