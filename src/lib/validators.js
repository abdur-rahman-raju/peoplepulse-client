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