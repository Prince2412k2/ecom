"use client";

import { FormEvent, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    setError(null);
    setLoading(true);

    try {
      const data = {
        email: form.email.value,
        password: form.password.value,
      };

      await axios.post("/api/users/login", data);
      form.reset();

      router.push(from || "/products");
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-gray-950 h-screen flex-col justify-center pb-60 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          src="/shopping-cart.png"
          alt="Main Logo"
          width={500}
          height={500}
          className="slide-in mx-auto h-30 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full rounded-md bg-gray-900 px-3 py-1.5 text-white"
          />
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            required
            className="w-full rounded-md bg-gray-900 px-3 py-1.5 text-white"
          />
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-indigo-500 px-3 py-1.5 text-white disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
