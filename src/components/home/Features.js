const features = [
  {
    title: "Start in two minutes",
    text: "Pick a type, a place and a future date. Your event appears for everyone nearby right away.",
    icon: "M12 5v14M5 12h14",
  },
  {
    title: "Join with one tap",
    text: "Log in once, then join any event. Each person can join an event only once, so the count stays honest.",
    icon: "M5 13l4 4L19 7",
  },
  {
    title: "See how many are needed",
    text: "Every event shows its volunteer target and how many spots are still open.",
    icon: "M17 20h5v-2a4 4 0 0 0-3-3.9M9 20H4v-2a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v2h-5ZM12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm7 1a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z",
  },
  {
    title: "Your events, your control",
    text: "Edit or delete the events you created. Nobody else can change them.",
    icon: "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z",
  },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <p className="section-kicker">Why PeoplePulse</p>
      <h2 className="section-title mt-2">Small acts, organised well</h2>
      <p className="section-lead mt-3">
        Everything you need to turn good intentions into a Saturday morning that actually happens.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <div
            key={f.title}
            className="flex h-full flex-col rounded-box border border-base-300 bg-base-100 p-6 transition-shadow hover:shadow-lg"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-content">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d={f.icon} />
              </svg>
            </div>
            <h3 className="mt-5 text-xl font-bold">{f.title}</h3>
            <p className="mt-2 leading-relaxed opacity-80">{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}