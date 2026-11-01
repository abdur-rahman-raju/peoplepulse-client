"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import PrivateRoute from "@/components/PrivateRoute";
import EventForm from "@/components/EventForm";

export default function CreateEventPage() {
  const router = useRouter();

  async function handleSubmit(data, validationMessage) {
    if (!data) {
      toast.error(validationMessage);
      return;
    }

    try {
      await api("/events", { method: "POST", body: data, auth: true });
      toast.success("Your event is live!");
      router.push("/events");
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <PrivateRoute>
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <p className="section-kicker">Organise</p>
        <h1 className="section-title mt-2">Create an event</h1>
        <p className="section-lead mt-3">
          Tell neighbours what you are planning. You can edit or delete it later from Manage Events.
        </p>

        <div className="mt-10 rounded-box border border-base-300 bg-base-100 p-6 sm:p-8">
          <EventForm onSubmit={handleSubmit} submitLabel="Publish Event" busyLabel="Publishing..." />
        </div>
      </div>
    </PrivateRoute>
  );
}