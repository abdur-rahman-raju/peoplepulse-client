import Link from "next/link";
import Logo from "./Logo";

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 22v-8.2h2.8l.5-3.3h-3.3V8.4c0-1 .5-1.8 1.9-1.8h1.5V3.8s-1.3-.2-2.6-.2c-2.6 0-4.3 1.6-4.3 4.4v2.5H7.2v3.3H10V22Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const socials = [
  { label: "PeoplePulse on X", href: "https://x.com", icon: <XIcon /> },
  { label: "PeoplePulse on Facebook", href: "https://facebook.com", icon: <FacebookIcon /> },
  { label: "PeoplePulse on Instagram", href: "https://instagram.com", icon: <InstagramIcon /> },
];

export default function Footer() {
  return (
    <footer className="mt-20 bg-neutral text-neutral-content">

      <div className="overflow-hidden border-b border-neutral-content/10">
        <svg
          viewBox="0 0 1200 60"
          className="h-12 w-full text-primary"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 30h380l20-22 28 44 24-34 14 12h140l20-22 28 44 24-34 14 12H1200"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="text-neutral-content">
            <Logo />
          </div>
          <p className="mt-4 max-w-md leading-relaxed opacity-80">
            PeoplePulse connects neighbours who want to help. Start a winter
            clothes drive, a cleanup or a food kitchen, or join one that is
            already happening near you.
          </p>

          <div className="mt-6 flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-content/30 transition-colors hover:border-secondary hover:bg-secondary hover:text-secondary-content"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-secondary">
            Explore
          </h2>
          <ul className="space-y-2">
            <li><Link className="hover:text-secondary" href="/">Home</Link></li>
            <li><Link className="hover:text-secondary" href="/events">Upcoming Events</Link></li>
            <li><Link className="hover:text-secondary" href="/create-event">Create an Event</Link></li>
            <li><Link className="hover:text-secondary" href="/joined-events">Joined Events</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-secondary">
            Contact
          </h2>
          <ul className="space-y-2">
            <li>Dhaka, Bangladesh</li>
            <li>
              <a className="hover:text-secondary" href="mailto:hello@peoplepulse.app">
                hello@peoplepulse.app
              </a>
            </li>
            <li>
              <a className="hover:text-secondary" href="tel:+8801700000000">
                +880 1700 000000
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-neutral-content/10">
        <p className="mx-auto max-w-7xl px-4 py-5 text-center text-sm opacity-70 sm:px-6">
          © {new Date().getFullYear()} PeoplePulse. Made with care for our neighbours.
        </p>
      </div>
    </footer>
  );
}