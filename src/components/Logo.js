import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="PeoplePulse home">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-content">
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M2 12h4l2.5-6 4 12 2.5-6H22" />
        </svg>
      </span>
      <span className="text-xl font-extrabold tracking-tight">
        People<span className="text-primary">Pulse</span>
      </span>
    </Link>
  );
}