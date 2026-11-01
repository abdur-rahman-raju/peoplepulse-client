"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { EVENT_TYPES } from "@/lib/validators";
import EventCard from "@/components/EventCard";
import { EventGridSkeleton } from "@/components/Skeletons";

export default function UpcomingEventsPage() {
  const [events, setEvents] = useState(null);
  const [error, setError] = useState("");
  const [type, setType] = useState("all");
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setQuery(search.trim()), 350);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setEvents(null);
    setError("");

    const params = new URLSearchParams();
    if (type !== "all") params.set("type", type);
    if (query) params.set("search", query);

    api(`/events?${params.toString()}`)
      .then((data) => setEvents(data.events))
      .catch((err) => setError(err.message));
  }, [type, query]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <p className="section-kicker">Find your cause</p>
      <h1 className="section-title mt-2">Upcoming events</h1>
      <p className="section-lead mt-3">
        Only events that have not happened yet are shown here, soonest first.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <label className="flex-1">
          <span className="sr-only">Search events</span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title"
            className="input input-bordered w-full rounded-full"
          />
        </label>

        <label>
          <span className="sr-only">Filter by type</span>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="select select-bordered w-full rounded-full sm:w-60"
          >
            <option value="all">All types</option>
            {EVENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-10">
        {error ? (
          <div role="alert" className="alert alert-error alert-soft">
            {error}
          </div>
        ) : !events ? (
          <EventGridSkeleton />
        ) : events.length === 0 ? (
          <div className="rounded-box border border-dashed border-base-300 p-14 text-center">
            <p className="text-lg font-semibold">Nothing matches right now</p>
            <p className="mt-1 opacity-75">Try another type or clear the search.</p>
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