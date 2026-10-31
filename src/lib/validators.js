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

// বড় হাতের অক্ষর, ছোট হাতের অক্ষর আর কমপক্ষে ৬ অক্ষর
// ঠিক থাকলে ফাঁকা লেখা ফেরত দেয়, ভুল থাকলে ভুলের বার্তা দেয়
export function validatePassword(password) {
  if (!/[A-Z]/.test(password)) return "Password must have at least one uppercase letter";
  if (!/[a-z]/.test(password)) return "Password must have at least one lowercase letter";
  if (password.length < 6) return "Password must be at least 6 characters long";
  return "";
}