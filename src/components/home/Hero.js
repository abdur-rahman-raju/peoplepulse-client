import Link from "next/link";


const sampleCards = [
  { title: "Winter Clothes Distribution", place: "Mirpur 10, Dhaka", date: "24 Nov", tag: "Clothes", progress: 70 },
  { title: "Riverbank Cleanup Drive", place: "Buriganga, Dhaka", date: "02 Dec", tag: "Cleanup", progress: 45 },
  { title: "Community Food Kitchen", place: "Old Dhaka", date: "08 Dec", tag: "Food", progress: 85 },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-base-200">

      <svg
        viewBox="0 0 1200 200"
        className="pointer-events-none absolute inset-x-0 top-1/2 h-40 w-full -translate-y-1/2 text-primary/15"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 100h420l24-70 36 140 30-100 18 30h240l24-70 36 140 30-100 18 30H1200"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <div>
          <p className="section-kicker">Winter is coming. So are we.</p>

          <h1 className="mt-4 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
            Feel the <span className="text-primary">pulse</span> of your neighbourhood.
          </h1>

          <p className="section-lead mt-6 text-lg">
            PeoplePulse brings neighbours together for winter clothes drives, hot meals, river
            cleanups and tree plantations. Start an event in two minutes, or join one that needs
            your hands.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/events" className="btn btn-primary btn-lg rounded-full px-8">
              Find an event
            </Link>
            <Link href="/create-event" className="btn btn-outline btn-primary btn-lg rounded-full px-8">
              Organise one
            </Link>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-sm font-medium opacity-80">
            <li>✓ Free to join</li>
            <li>✓ Events near you</li>
            <li>✓ Built by neighbours</li>
          </ul>
        </div>

       
        <div className="relative mx-auto w-full max-w-md" aria-hidden="true">
          <div className="space-y-4">
            {sampleCards.map((c, i) => (
              <div
                key={c.title}
                className={`rounded-box border border-base-300 bg-base-100 p-5 shadow-lg ${
                  i === 1 ? "sm:ml-10" : i === 2 ? "sm:ml-4" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-content">
                    {c.tag}
                  </span>
                  <span className="text-sm font-semibold text-primary">{c.date}</span>
                </div>
                <h3 className="mt-3 text-lg font-bold leading-snug">{c.title}</h3>
                <p className="mt-1 text-sm opacity-70">{c.place}</p>
                <progress className="progress progress-primary mt-4 w-full" value={c.progress} max="100" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}