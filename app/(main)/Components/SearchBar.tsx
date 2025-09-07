
"use client";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { SearchResponse, type SearchResponseType } from "@/app/api/products/search/schema";
import Image from "next/image";
import Link from "next/link";


export default function SearchBar() {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResponseType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults(null);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await axios.post("/api/products/search", { query });

        // Validate response using Zod
        const parsed = SearchResponse.parse(res.data.products);
        setResults(parsed);
      } catch (err) {
        console.error("Search error:", err);
        setResults(null);
      } finally {
        setLoading(false);
      }
    }, 1000); // debounce

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="w-full max-w-lg lg:max-w-xs">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <FaSearch className="text-gray-500" />
        </div>
        <input
          id="search"
          name="search"
          className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          placeholder="Search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading && <p className="mt-2 text-sm text-gray-500">Searching...</p>}
      {results ? (
        <ul className="mt-2 border border-gray-200 rounded-md bg-white shadow-sm">
          {results.map((p) => (
            <li key={p._id} className="px-3 py-2 hover:bg-gray-50">
              <Link href={`/products/${p._id}/`}>
                <Image height={500} width={500} src={p.image} alt={p.title} className="inline w-6 h-6 mr-2" />
                {`${p.title
                  .split(" ")
                  .slice(0, 4)
                  .join(" ")}...`}
              </Link>
            </li>
          ))}
        </ul>
      ) : (<div></div>)}
    </div>
  );
}

