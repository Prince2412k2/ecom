"use client";
import { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import axios, { AxiosError } from "axios";
import { SearchResponse, type SearchResponseType } from "@/app/api/products/search/schema";
import Image from "next/image";
import Link from "next/link";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResponseType>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null); // input ref for blur

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await axios.post(
          "/api/products/search",
          { query },
          { signal: controller.signal }
        );

        const parsed = SearchResponse.parse(res.data.products || []);
        setResults(parsed);
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          if (err.name !== "CanceledError") {
            console.error("Search error:", err);
          }
        }
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 500); // debounce 500ms

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  const highlight = (title: string) => {
    const regex = new RegExp(`(${query})`, "gi");
    return title.split(" ").slice(0, 4).join(" ").replace(regex, (match) => `<mark>${match}</mark>`);
  };

  // Reset and unfocus search bar when a product is clicked
  const handleClick = () => {
    setQuery("");
    setResults([]);
    inputRef.current?.blur(); // remove focus
  };

  return (
    <div className="text-black w-full max-w-lg lg:max-w-xs relative">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <FaSearch className="text-gray-500" />
        </div>
        <input
          ref={inputRef}
          id="search"
          name="search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          placeholder="Search products"
        />
      </div>

      {loading && <p className="mt-2 text-sm text-gray-700">Searching...</p>}

      {results.length > 0 ? (
        <ul className="absolute z-10 w-full mt-2 border border-gray-200 rounded-md bg-white shadow-sm max-h-64 overflow-y-auto">
          {results.map((p) => (
            <li key={p._id} className="px-3 py-2 hover:bg-gray-50">
              <Link
                href={`/products/${p._id}/`}
                className="flex items-center gap-2"
                onClick={handleClick}
              >
                <Image src={p.image} alt={p.title} width={24} height={24} className="rounded-sm" />
                <span
                  className="text-sm"
                  dangerouslySetInnerHTML={{ __html: highlight(p.title) }}
                />
              </Link>
            </li>
          ))}
        </ul>
      ) : query && !loading ? (
        <p className="mt-2 text-sm text-gray-700">No products found</p>
      ) : null}
    </div>
  );
}
