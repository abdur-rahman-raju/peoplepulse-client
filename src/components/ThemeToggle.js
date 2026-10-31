"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("pulse-light");

  // পেজ খুললে বর্তমান theme পড়ে নেয়
  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") || "pulse-light");
  }, []);

  function toggle() {
    const next = theme === "pulse-dark" ? "pulse-light" : "pulse-dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("pulse-theme", next);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="btn btn-circle btn-ghost text-xl"
      aria-label="Toggle theme"
    >
      {theme === "pulse-dark" ? "☀️" : "🌙"}
    </button>
  );
}