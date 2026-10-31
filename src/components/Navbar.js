"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Upcoming Events" },
];

export default function Navbar() {
  const pathname = usePathname();

  const linkClass = (href) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
      pathname === href
        ? "bg-primary text-primary-content"
        : "hover:bg-base-200"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex items-center gap-2">
          {/* মোবাইলে মেনু */}
          <div className="dropdown md:hidden">
            <button
              tabIndex={0}
              type="button"
              className="btn btn-ghost btn-circle"
              aria-label="Open menu"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-50 mt-3 w-52 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg"
            >
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <Logo />
        </div>

        {/* বড় পর্দায় মেনু */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass(l.href)}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/login" className="btn btn-primary btn-sm rounded-full px-5 sm:btn-md">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
