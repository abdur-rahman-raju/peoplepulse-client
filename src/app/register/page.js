"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { isHttpUrl, validateEmail, validatePassword } from "@/lib/validators";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({ name: "", email: "", photoURL: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  }

  function validate() {
    const next = {};
    if (form.name.trim().length < 2) next.name = "Please enter your name";
    if (!validateEmail(form.email)) next.email = "Please enter a valid email address";
    if (!isHttpUrl(form.photoURL.trim())) next.photoURL = "Enter a photo URL starting with http or https";
    const passwordError = validatePassword(form.password);
    if (passwordError) next.password = passwordError;
    return next;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      toast.error(Object.values(next)[0]);
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
      image: form.photoURL.trim(),
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Could not create your account");
      return;
    }

    toast.success("Your account is ready. Welcome to PeoplePulse!");
    router.push("/");
    router.refresh();
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-14">
      <h1 className="text-3xl font-bold">Join PeoplePulse</h1>
      <p className="mt-2 opacity-75">Create an account to start or join events near you.</p>

      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Full name</span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className={`input input-bordered w-full ${errors.name ? "input-error" : ""}`}
          />
          {errors.name && <span className="mt-1 block text-sm text-error">{errors.name}</span>}
        </label>

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
          <span className="mb-1 block text-sm font-medium">Photo URL</span>
          <input
            type="url"
            name="photoURL"
            value={form.photoURL}
            onChange={handleChange}
            placeholder="https://example.com/my-photo.jpg"
            className={`input input-bordered w-full ${errors.photoURL ? "input-error" : ""}`}
          />
          {errors.photoURL && <span className="mt-1 block text-sm text-error">{errors.photoURL}</span>}
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium">Password</span>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
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
          {errors.password ? (
            <span className="mt-1 block text-sm text-error">{errors.password}</span>
          ) : (
            <span className="mt-1 block text-xs opacity-65">
              Use an uppercase letter, a lowercase letter and at least 6 characters.
            </span>
          )}
        </label>

        <button type="submit" disabled={loading} className="btn btn-primary w-full rounded-full">
          {loading ? <span className="loading loading-spinner loading-sm" /> : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="link link-primary font-semibold">
          Log in
        </Link>
      </p>
    </div>
  );
}