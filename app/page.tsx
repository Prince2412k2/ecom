"use client";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Welcome to Our Store</h1>
        <div className="space-x-4">
          <Link href="/products" className="px-8 py-3 bg-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
            Go to Shop
          </Link>
          <Link href="/admin/dashboard" className="px-8 py-3 bg-gray-700 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors">
            Go to Admin Panel
          </Link>
        </div>
      </div>
    </div>
  );
}
