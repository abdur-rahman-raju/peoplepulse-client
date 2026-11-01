"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { formatDate } from "@/lib/validators";

export default function EventDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");
  const [joined, setJoined] = useState(false);
  const [busy, setBusy] = useState(false);

  const loadEvent = useCallback(async () => {
    try {
      const data = await api(`/events/${id}`);
      setEvent(data.event);
    } catch (err) {
      setError(err.message);
    }
  }, [id]);

  useEffect(() => {
    loadEvent();
  }, [loadEvent]);

  useEffect(() => {
    if (!user) {
      setJoined(false);
      return;
    }
    api(`/events/${id}/joined`, { auth: true })
      .then((data) => setJoined(data.joined))
      .catch(() => {});
  }, [id, user]);

  async function handleJoin() {
    if (!user) {
      toast("Please log in to join this event");
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    setBusy(true);
    try {
      await api(`/events/${id}/join`, { method: "POST", auth: true });
      setJoined(true);
      toast.success("You are in! See you at the event.");
      await loadEvent();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function handleLeave() {
    setBusy(true);
    try {
      await api(`/events/${id}/join`, { method: "DELETE", auth: true });
      setJoined(false);
      toast.success("You have left this event");
      await loadEvent();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  }

  if (error) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="section-title">We could not find that event</h1>
        <p className="mt-3 opacity-75">{error}</p>
        <Link href="/events" className="btn btn-primary mt-6 rounded-full">
          Back to events
        </Link>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-12 sm:px-6" aria-busy="true">
        <div className="skeleton aspect-[16/8] w-full" />
        <div className="skeleton h-10 w-2/3" />
        <div className="skeleton h-5 w-full" />
        <div className="skeleton h-5 w-5/6" />
      </div>
    );
  }

  const joinedCount = event.joinedCount || 0;
  const spotsLeft = Math.max(event.volunteersNeeded - joinedCount, 0);
  const percent = Math.min(100, Math.round((joinedCount / event.volunteersNeeded) * 100));
  const isOwner = user?.email === event.creatorEmail;
  const past = event.eventDate < new Date().toLocaleDateString("en-CA");

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Link href="/events" className="text-sm font-medium text-primary hover:underline">
        ← All events
      </Link>

      <div className="mt-4 overflow-hidden rounded-[1.5rem] bg-base-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={event.thumbnail} alt={event.title} className="aspect-[16/8] w-full object-cover" />
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-content">
            {event.eventType}
          </span>
          <h1 className="section-title mt-4">{event.title}</h1>
          <p className="mt-6 whitespace-pre-line text-lg leading-relaxed opacity-90">{event.description}</p>

          <p className="mt-8 text-sm opacity-70">
            Organised by <span className="font-semibold">{event.creatorName || "a neighbour"}</span>
          </p>
        </div>

        <aside className="h-fit rounded-box border border-base-300 bg-base-200 p-6 lg:sticky lg:top-24">
          <dl className="space-y-4">
            <div>
              <dt className="text-xs uppercase tracking-widest opacity-60">Date</dt>
              <dd className="font-semibold">{formatDate(event.eventDate)}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest opacity-60">Location</dt>
              <dd className="font-semibold">{event.location}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest opacity-60">Volunteers</dt>
              <dd className="font-semibold">
                {joinedCount} of {event.volunteersNeeded} joined
              </dd>
              <progress className="progress progress-primary mt-2 w-full" value={percent} max="100" />
            </div>
          </dl>

          <div className="mt-6">
            {past ? (
              <button disabled className="btn w-full rounded-full">
                This event has ended
              </button>
            ) : isOwner ? (
              <Link href="/manage-events" className="btn btn-outline btn-primary w-full rounded-full">
                You organise this event
              </Link>
            ) : joined ? (
              <div className="space-y-3">
                <div role="status" className="rounded-full bg-success/15 px-4 py-3 text-center text-sm font-semibold text-success">
                  ✓ You have joined this event
                </div>
                <button onClick={handleLeave} disabled={busy} className="btn btn-ghost w-full rounded-full">
                  {busy ? <span className="loading loading-spinner loading-sm" /> : "Leave event"}
                </button>
              </div>
            ) : (
              <button
                onClick={handleJoin}
                disabled={busy || isPending || spotsLeft === 0}
                className="btn btn-primary w-full rounded-full"
              >
                {busy ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : spotsLeft === 0 ? (
                  "All spots taken"
                ) : (
                  "Join Event"
                )}
              </button>
            )}

            {!user && !isPending && !past && (
              <p className="mt-3 text-center text-xs opacity-70">You need to log in to join.</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}