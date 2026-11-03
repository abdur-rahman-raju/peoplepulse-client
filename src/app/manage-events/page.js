"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { formatDate } from "@/lib/validators";
import PrivateRoute from "@/components/PrivateRoute";
import EventForm from "@/components/EventForm";
import { EventGridSkeleton } from "@/components/Skeletons";

function ManageList() {
  const [events, setEvents] = useState(null);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [deleteBusy, setDeleteBusy] = useState(false);

  async function load() {
    try {
      const data = await api("/my-events", { auth: true });
      setEvents(data.events);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleUpdate(data, validationMessage) {
    if (!data) {
      toast.error(validationMessage);
      return;
    }
    try {
      await api(`/events/${editing._id}`, { method: "PUT", body: data, auth: true });
      toast.success("Event updated");
      setEditing(null);
      load();
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function confirmDelete() {
    setDeleteBusy(true);
    try {
      await api(`/events/${deleting._id}`, { method: "DELETE", auth: true });
      toast.success("Event deleted");
      setDeleting(null);
      load();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleteBusy(false);
    }
  }

  const today = new Date().toLocaleDateString("en-CA");

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="section-kicker">Your events</p>
          <h1 className="section-title mt-2">Manage events</h1>
          <p className="section-lead mt-3">View, edit or delete the events you created.</p>
        </div>
        <Link href="/create-event" className="btn btn-primary rounded-full px-6">
          New event
        </Link>
      </div>

      <div className="mt-10">
        {error ? (
          <div role="alert" className="alert alert-error alert-soft">
            {error}
          </div>
        ) : !events ? (
          <EventGridSkeleton count={3} />
        ) : events.length === 0 ? (
          <div className="rounded-box border border-dashed border-base-300 p-14 text-center">
            <p className="text-lg font-semibold">You have not created any events yet</p>
            <Link href="/create-event" className="btn btn-primary mt-5 rounded-full">
              Create your first event
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-box border border-base-300">
            <table className="table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th>Joined</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((ev) => (
                  <tr key={ev._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={ev.thumbnail} alt="" className="h-12 w-16 shrink-0 rounded-lg object-cover" />
                        <div>
                          <p className="font-semibold">{ev.title}</p>
                          <p className="text-xs opacity-65">{ev.eventType}</p>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap">
                      {formatDate(ev.eventDate)}
                      {ev.eventDate < today && <span className="badge badge-ghost ml-2">Past</span>}
                    </td>
                    <td>{ev.location}</td>
                    <td>
                      {ev.joinedCount || 0} / {ev.volunteersNeeded}
                    </td>
                    <td>
                      <div className="flex justify-end gap-2">
                        <Link href={`/events/${ev._id}`} className="btn btn-ghost btn-sm rounded-full">
                          View
                        </Link>
                        <button onClick={() => setEditing(ev)} className="btn btn-outline btn-primary btn-sm rounded-full">
                          Edit
                        </button>
                        <button onClick={() => setDeleting(ev)} className="btn btn-outline btn-error btn-sm rounded-full">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

  
      {editing && (
        <dialog className="modal modal-open" aria-label="Edit event">
          <div className="modal-box max-w-3xl">
            <h2 className="text-2xl font-bold">Edit event</h2>
            <div className="mt-6">
              <EventForm
                initial={{ ...editing, volunteersNeeded: String(editing.volunteersNeeded) }}
                onSubmit={handleUpdate}
                submitLabel="Save changes"
                busyLabel="Saving..."
              />
            </div>
            <div className="modal-action mt-2">
              <button onClick={() => setEditing(null)} className="btn btn-ghost rounded-full">
                Cancel
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setEditing(null)} />
        </dialog>
      )}

      {deleting && (
        <dialog className="modal modal-open" aria-label="Confirm delete">
          <div className="modal-box">
            <h2 className="text-xl font-bold">Delete this event?</h2>
            <p className="mt-3 opacity-80">
              “{deleting.title}” and everyone&apos;s sign-ups for it will be removed. This cannot be undone.
            </p>
            <div className="modal-action">
              <button onClick={() => setDeleting(null)} className="btn btn-ghost rounded-full">
                Keep it
              </button>
              <button onClick={confirmDelete} disabled={deleteBusy} className="btn btn-error rounded-full">
                {deleteBusy ? <span className="loading loading-spinner loading-sm" /> : "Yes, delete"}
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setDeleting(null)} />
        </dialog>
      )}
    </div>
  );
}

export default function ManageEventsPage() {
  return (
    <PrivateRoute>
      <ManageList />
    </PrivateRoute>
  );
}