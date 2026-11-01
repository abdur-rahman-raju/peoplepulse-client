"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { validateEmail } from "@/lib/validators";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    toast.success("Thanks! We will let you know when new events open up.");
    setEmail("");
  }

  return (
    <section className="px-4 pb-20 sm:px-6">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-primary px-6 py-14 text-primary-content sm:px-14">
        <svg
          viewBox="0 0 1200 200"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 w-full text-primary-content/15"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 100h420l24-70 36 140 30-100 18 30h240l24-70 36 140 30-100 18 30H1200"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="relative grid items-center gap-8 lg:grid-cols-2">
          <div>
            <p className="section-kicker !text-primary-content/80">Newsletter</p>
            <h2 className="section-title mt-2">Never miss a chance to help</h2>
            <p className="mt-3 max-w-md leading-relaxed opacity-85">
              One short email a week with new events near you. No spam, ever.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3 sm:flex-row">
            <label className="flex-1">
              <span className="sr-only">Email address</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="input w-full rounded-full text-base-content"
              />
            </label>
            <button type="submit" className="btn btn-secondary rounded-full px-8">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}