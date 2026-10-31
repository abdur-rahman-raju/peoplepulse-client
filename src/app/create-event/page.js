import PrivateRoute from "@/components/PrivateRoute";

export default function CreateEventPage() {
  return (
    <PrivateRoute>
      <div className="mx-auto max-w-3xl px-4 py-14">
        <h1 className="text-3xl font-bold">Create Event</h1>
        <p className="mt-2 opacity-75">This page is coming soon.</p>
      </div>
    </PrivateRoute>
  );
}