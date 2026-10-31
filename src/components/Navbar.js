"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Upcoming Events" },
];

// ছবির লিংক কাজ না করলে এই সাধারণ ছবি দেখাবে
const FALLBACK_AVATAR =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'><rect width='40' height='40' fill='#0f766e'/><circle cx='20' cy='15' r='7' fill='#f0fdfa'/><path d='M6 38c2-9 8-12 14-12s12 3 14 12Z' fill='#f0fdfa'/></svg>"
  );

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  // লগইন করা ব্যবহারকারীর তথ্য। লোড হওয়ার সময় isPending সত্য থাকে
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  async function handleLogout() {
    await authClient.signOut();
    toast.success("You have been logged out. See you soon!");
    router.push("/");
    router.refresh();
  }

  const linkClass = (href) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
      pathname === href ? "bg-primary text-primary-content" : "hover:bg-base-200"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex items-center gap-2">
          {/* মোবাইলে মেনু */}
          <div className="dropdown md:hidden">
            <button tabIndex={0} type="button" className="btn btn-ghost btn-circle" aria-label="Open menu">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
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

          {isPending ? (
            // session লোড হওয়ার সময় ফাঁকা বাক্স, যাতে Login বাটন ঝিলিক দিয়ে না ওঠে
            <div className="skeleton h-10 w-24 rounded-full" aria-hidden="true" />
          ) : user ? (
            <>
              <div className="dropdown dropdown-end">
                <button
                  tabIndex={0}
                  type="button"
                  className="tooltip tooltip-bottom btn btn-ghost btn-circle avatar"
                  data-tip={user.name}
                  aria-label={`Account menu for ${user.name}`}
                >
                  <div className="w-10 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={user.image || FALLBACK_AVATAR}
                      alt={user.name}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = FALLBACK_AVATAR;
                      }}
                    />
                  </div>
                </button>

                <ul
                  tabIndex={0}
                  className="menu dropdown-content z-50 mt-3 w-60 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg"
                >
                  <li className="menu-title px-3 py-2">
                    <span className="block truncate text-base-content">{user.name}</span>
                    <span className="block truncate text-xs font-normal opacity-70">{user.email}</span>
                  </li>
                  <li><Link href="/create-event">Create Event</Link></li>
                  <li><Link href="/manage-events">Manage Events</Link></li>
                  <li><Link href="/joined-events">Joined Events</Link></li>
                </ul>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-outline btn-primary btn-sm rounded-full px-5 sm:btn-md"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="btn btn-primary btn-sm rounded-full px-5 sm:btn-md">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}