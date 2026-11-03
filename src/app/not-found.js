import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-28 text-center">
      <p className="section-kicker">404</p>
      <h1 className="section-title mt-2">This page has wandered off</h1>
      <p className="mt-3 opacity-75">
        The page you are looking for does not exist. Let us get you back to something useful.
      </p>
      <Link href="/" className="btn btn-primary mt-6 rounded-full px-8">
        Go home
      </Link>
    </div>
  );
}