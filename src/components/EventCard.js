import Link from "next/link";
import { formatDate } from "@/lib/validators";

export default function EventCard({ event }) {
  const joined = event.joinedCount || 0;
  const needed = event.volunteersNeeded || 0;
  const spotsLeft = Math.max(needed - joined, 0);
  const percent = needed ? Math.min(100, Math.round((joined / needed) * 100)) : 0;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-box border border-base-300 bg-base-100 transition-shadow hover:shadow-lg">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-base-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.thumbnail}
          alt={event.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <span className="absolute left-3 top-3 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-content">
          {event.eventType}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 min-h-[3.4rem] text-xl font-bold leading-snug">
          {event.title}
        </h3>

        <ul className="mt-3 space-y-1.5 text-sm opacity-80">
          <li>📅 {formatDate(event.eventDate)}</li>
          <li className="line-clamp-1">📍 {event.location}</li>
        </ul>

        <div className="mt-4">
          <div className="mb-1 flex justify-between text-xs font-medium opacity-75">
            <span>{joined} joined</span>
            <span>{spotsLeft > 0 ? `${spotsLeft} spots left` : "Full"}</span>
          </div>
          <progress className="progress progress-primary w-full" value={percent} max="100" />
        </div>

        <Link href={`/events/${event._id}`} className="btn btn-primary mt-5 w-full rounded-full">
          View Event
        </Link>
      </div>
    </article>
  );
}