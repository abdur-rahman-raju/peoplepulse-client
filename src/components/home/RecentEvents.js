"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import EventCard from "@/components/EventCard";
import { EventGridSkeleton } from "@/components/Skeletons";

export default function RecentEvents() {
  const [events, setEvents] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api("/events?limit=6")
      .then((data) => setEvents(data.events))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="section-kicker">Happening soon</p>
          <h2 className="section-title mt-2">Recent upcoming events</h2>
          <p className="section-lead mt-3">
            Pick one near you and turn up. Every pair of hands counts.
          </p>
        </div>
        <Link href="/events" className="btn btn-outline btn-primary rounded-full px-6">
          See all events
        </Link>
      </div>

      <div className="mt-10">
        {error ? (
          <div role="alert" className="alert alert-error alert-soft">
            {error}
          </div>
        ) : !events ? (
          <EventGridSkeleton />
        ) : events.length === 0 ? (
          <div className="rounded-box border border-dashed border-base-300 p-12 text-center">
            <p className="text-lg font-semibold">No upcoming events yet</p>
            <p className="mt-1 opacity-75">Be the first to organise one in your neighbourhood.</p>
            <Link href="/create-event" className="btn btn-primary mt-5 rounded-full">
              Create an event
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}