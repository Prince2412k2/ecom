"use client";

import { useEffect, useState } from "react";

export default function ItemsButton({ _id, defaultItems = 1, max = Infinity }: { _id: string, defaultItems: number, max: number }) {
  const [items, setItems] = useState<number>(defaultItems);
  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(() => {
    async function checkLogin() {
      try {
        // Replace with your actual API endpoint
        const res = await fetch("/api/check")
        const data = await res.json()

        if (data.loggedIn) {
          setLoggedIn(true)
        } else {
          setLoggedIn(false)
        }
      } catch (err) {
        console.error("Error checking login:", err)
        setLoggedIn(false)
      }
    }

    checkLogin()
  }, [])
  return (
    <div className="flex flex-row items-center gap-4 bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center">
        <button
          disabled={items < 2 || !loggedIn}
          className="cursor-pointer rounded-l-md bg-gray-200 p-3 text-lg font-bold text-gray-700 transition-colors duration-200 hover:bg-blue-500 hover:text-white disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
          onClick={() => setItems(items > 1 ? items - 1 : 1)}
        >
          -
        </button>
        <div className="flex h-12 w-12 items-center justify-center border-y-2 border-gray-200 bg-white">
          <h1 className="text-xl font-semibold text-gray-800">{items}</h1>
        </div>
        <button
          disabled={items >= max || !loggedIn}
          className="cursor-pointer rounded-r-md bg-gray-200 p-3 text-lg font-bold text-gray-700 transition-colors duration-200 hover:bg-blue-500 hover:text-white disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
          onClick={() => setItems(items < max ? items + 1 : max)}
        >
          +
        </button>
      </div>
      <button
        disabled={!loggedIn}
        onClick={() => { }}
        type="button"
        className="flex-1 rounded-lg bg-blue-600 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-blue-500/50 transition-all duration-200 hover:scale-105 hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-500/80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        {loggedIn ? "Add to Cart" : "login"}
      </button>
    </div>
  );
}
