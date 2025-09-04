"use client";

import axios from "axios";
import Image from "next/image";
import { FormEvent, useRef, useState } from "react";

export default function SignUp() {
  const formRef = useRef<HTMLFormElement>(null);

  // UI feedback state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(form);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      const response = await axios.post("/api/users/signup", data);

      if (response.status === 201) {
        setSuccess("Account created! Redirecting...");
        form.reset();
        // optionally redirect after a delay
        // router.push("/dashboard");
      }
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data.error || "Something went wrong");
      } else {
        setError("Network error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-col align-middle justify-center lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          src="/shopping-cart.png"
          alt="Main Logo"
          width={120}
          height={120}
          className="mx-auto"
        />
        <h2 className="mt-6 text-center text-2xl font-bold text-white">
          Welcome
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-100"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-2 block w-full rounded-md bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-100"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-2 block w-full rounded-md bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-100"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-2 block w-full rounded-md bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400 disabled:opacity-50"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {/* Feedback messages */}
        {error && (
          <p className="mt-4 text-sm text-red-400 text-center">{error}</p>
        )}
        {success && (
          <p className="mt-4 text-sm text-green-400 text-center">{success}</p>
        )}
      </div>
    </div>
  );
}
