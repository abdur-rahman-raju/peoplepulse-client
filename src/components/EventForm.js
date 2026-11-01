"use client";

import { useState } from "react";
import { EVENT_TYPES, tomorrowISO, validateEvent } from "@/lib/validators";

const EMPTY = {
  title: "",
  eventType: "",
  location: "",
  eventDate: "",
  volunteersNeeded: "",
  thumbnail: "",
  description: "",
};


export default function EventForm({ initial, onSubmit, submitLabel, busyLabel }) {
  const [form, setForm] = useState({ ...EMPTY, ...(initial || {}) });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const next = validateEvent(form);
    setErrors(next);

    if (Object.keys(next).length > 0) {
      onSubmit(null, Object.values(next)[0]);
      return;
    }

    setBusy(true);
    await onSubmit({
      title: form.title.trim(),
      eventType: form.eventType,
      location: form.location.trim(),
      eventDate: form.eventDate,
      volunteersNeeded: Number(form.volunteersNeeded),
      thumbnail: form.thumbnail.trim(),
      description: form.description.trim(),
    });
    setBusy(false);
  }

  const err = (name) =>
    errors[name] && <span className="mt-1 block text-sm text-error">{errors[name]}</span>;

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <label className="sm:col-span-2">
        <span className="mb-1 block text-sm font-medium">Event title</span>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="e.g. Winter Clothes Distribution"
          className={`input input-bordered w-full ${errors.title ? "input-error" : ""}`}
        />
        {err("title")}
      </label>

      <label>
        <span className="mb-1 block text-sm font-medium">Event type</span>
        <select
          name="eventType"
          value={form.eventType}
          onChange={handleChange}
          className={`select select-bordered w-full ${errors.eventType ? "select-error" : ""}`}
        >
          <option value="" disabled>
            Choose a type
          </option>
          {EVENT_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {err("eventType")}
      </label>

      <label>
        <span className="mb-1 block text-sm font-medium">Event date</span>
        <input
          type="date"
          name="eventDate"
          min={tomorrowISO()}
          value={form.eventDate}
          onChange={handleChange}
          className={`input input-bordered w-full ${errors.eventDate ? "input-error" : ""}`}
        />
        {err("eventDate")}
      </label>

      <label>
        <span className="mb-1 block text-sm font-medium">Location</span>
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="e.g. Mirpur 10, Dhaka"
          className={`input input-bordered w-full ${errors.location ? "input-error" : ""}`}
        />
        {err("location")}
      </label>

      <label>
        <span className="mb-1 block text-sm font-medium">Volunteers needed</span>
        <input
          type="number"
          min="1"
          max="5000"
          name="volunteersNeeded"
          value={form.volunteersNeeded}
          onChange={handleChange}
          placeholder="e.g. 30"
          className={`input input-bordered w-full ${errors.volunteersNeeded ? "input-error" : ""}`}
        />
        {err("volunteersNeeded")}
      </label>

      <label className="sm:col-span-2">
        <span className="mb-1 block text-sm font-medium">Thumbnail image URL</span>
        <input
          type="url"
          name="thumbnail"
          value={form.thumbnail}
          onChange={handleChange}
          placeholder="https://example.com/photo.jpg"
          className={`input input-bordered w-full ${errors.thumbnail ? "input-error" : ""}`}
        />
        {err("thumbnail")}
      </label>

      <label className="sm:col-span-2">
        <span className="mb-1 block text-sm font-medium">Description</span>
        <textarea
          name="description"
          rows={6}
          value={form.description}
          onChange={handleChange}
          placeholder="What will happen, who it helps, what volunteers should bring..."
          className={`textarea textarea-bordered w-full ${errors.description ? "textarea-error" : ""}`}
        />
        <span className="mt-1 block text-xs opacity-65">{form.description.trim().length}/1500</span>
        {err("description")}
      </label>

      <div className="sm:col-span-2">
        <button type="submit" disabled={busy} className="btn btn-primary w-full rounded-full sm:w-auto sm:px-10">
          {busy ? (
            <>
              <span className="loading loading-spinner loading-sm" /> {busyLabel}
            </>
          ) : (
            submitLabel
          )}
        </button>
      </div>
    </form>
  );
}