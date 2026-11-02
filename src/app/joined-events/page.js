"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import PrivateRoute from "@/components/PrivateRoute";
import EventCard from "@/components/EventCard";
import { EventGridSkeleton } from "@/components/Skeletons";

function JoinedList() {
  const [events, setEvents] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api("/joined-events", { auth: true })
      .then((data) => setEvents(data.events))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <p className="section-kicker">Your commitments</p>
      <h1 className="section-title mt-2">Joined events</h1>
      <p className="section-lead mt-3">Events you have signed up for, in date order.</p>

      <div className="mt-10">
        {error ? (
          <div role="alert" className="alert alert-error alert-soft">
            {error}
          </div>
        ) : !events ? (
          <EventGridSkeleton count={3} />
        ) : events.length === 0 ? (
          <div className="rounded-box border border-dashed border-base-300 p-14 text-center">
            <p className="text-lg font-semibold">You have not joined any events yet</p>
            <Link href="/events" className="btn btn-primary mt-5 rounded-full">
              Browse upcoming events
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
    </div>
  );
}

export default function JoinedEventsPage() {
  return (
    <PrivateRoute>
      <JoinedList />
    </PrivateRoute>
  );
}