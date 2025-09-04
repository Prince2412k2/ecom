"use client";
import { FormEvent, useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function Login() {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    setError(null);
    setLoading(true);

    const data = {
      email: form.email.value,
      password: form.password.value,
    };

    try {
      const response = await axios.post("/api/users/login", data);
      form.reset();
      window.history.back();
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          // Server responded with a status outside 2xx
          if (err.response.status === 401) {
            setError("Invalid email or password.");
          } else if (err.response.status === 500) {
            setError("Something went wrong on our end. Try again later.");
          } else {
            setError(err.response.data?.error || "Login failed.");
          }
        } else if (err.request) {
          // No response received
          setError("No response from server. Check your connection.");
        } else {
          setError("Unexpected error. Please try again.");
        }
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-col align-middle justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm bg">
        <Image
          src="/shopping-cart.png"
          alt="Main Logo"
          width={500}
          height={500}
          className="slide-in mx-auto h-30 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-100"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm/6 font-medium text-gray-100"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-sm font-medium text-center">
              {error}
            </p>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-400">
          Not a member?{" "}
          <a
            href="/signup"
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Register Now
          </a>
        </p>
      </div>
    </div>
  );
}
