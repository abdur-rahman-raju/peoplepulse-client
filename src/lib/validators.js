export const EVENT_TYPES = [
  "Clothes Distribution",
  "Food Distribution",
  "Cleanup",
  "Plantation",
  "Blood Donation",
  "Health Camp",
  "Education",
  "Other",
];

export function isHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}


export function validatePassword(password) {
  if (!/[A-Z]/.test(password)) return "Password must have at least one uppercase letter";
  if (!/[a-z]/.test(password)) return "Password must have at least one lowercase letter";
  if (password.length < 6) return "Password must be at least 6 characters long";
  return "";
}

export function formatDate(iso) {
  if (!iso) return "";
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function tomorrowISO() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function validateEvent(f) {
  const errors = {};

  if (f.title.trim().length < 5 || f.title.trim().length > 100) {
    errors.title = "Title must be 5 to 100 characters";
  }
  if (f.description.trim().length < 20 || f.description.trim().length > 1500) {
    errors.description = "Description must be 20 to 1500 characters";
  }
  if (!EVENT_TYPES.includes(f.eventType)) {
    errors.eventType = "Please choose an event type";
  }
  if (!isHttpUrl(f.thumbnail.trim())) {
    errors.thumbnail = "Enter a valid image URL starting with http or https";
  }
  if (f.location.trim().length < 3) {
    errors.location = "Please enter the location";
  }
  if (!f.eventDate) {
    errors.eventDate = "Please choose a date";
  } else if (f.eventDate < tomorrowISO()) {
    errors.eventDate = "Event date must be in the future";
  }

  const n = Number(f.volunteersNeeded);
  if (!Number.isInteger(n) || n < 1 || n > 5000) {
    errors.volunteersNeeded = "Enter a whole number from 1 to 5000";
  }

  return errors;
}