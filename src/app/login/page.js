"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { validateEmail } from "@/lib/validators";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();

  // ?redirect=/manage-events থাকলে লগইনের পরে সেখানে যাবে, না থাকলে হোমে
  const redirect = params.get("redirect");
  const target = redirect && redirect.startsWith("/") ? redirect : "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const next = {};
    if (!validateEmail(form.email)) next.email = "Please enter a valid email address";
    if (!form.password) next.password = "Please enter your password";
    setErrors(next);

    if (Object.keys(next).length > 0) {
      toast.error(Object.values(next)[0]);
      return;
    }

    setLoading(true);
    const { error } = await authClient.signIn.email({
      email: form.email.trim(),
      password: form.password,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Wrong email or password");
      return;
    }

    toast.success("Welcome back! You are logged in.");
    router.push(target);
    router.refresh();
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-14">
      <h1 className="text-3xl font-bold">Welcome back</h1>
      <p className="mt-2 opacity-75">Log in to create events, join them and track your sign-ups.</p>

      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Email</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`}
          />
          {errors.email && <span className="mt-1 block text-sm text-error">{errors.email}</span>}
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium">Password</span>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Your password"
              className={`input input-bordered w-full pr-16 ${errors.password ? "input-error" : ""}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-primary"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && <span className="mt-1 block text-sm text-error">{errors.password}</span>}
        </label>

        <button type="submit" disabled={loading} className="btn btn-primary w-full rounded-full">
          {loading ? <span className="loading loading-spinner loading-sm" /> : "Log in"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm">
        New to PeoplePulse?{" "}
        <Link
          href={`/register${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ""}`}
          className="link link-primary font-semibold"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="skeleton mx-auto my-20 h-96 w-full max-w-md" />}>
      <LoginForm />
    </Suspense>
  );
}