"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("title") ?? "";
  const [search, setSearch] = useState(currentSearch);

  function handleSearch(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    // By default, submitting an HTML form can cause a request to be sent and the page to be reloaded.
    // We want to handle the routing ourselves with router.push() , so we'll override the default behavior.

    const params = new URLSearchParams(searchParams.toString());
    const value = search.trim();

    if (value) {
      params.set("title", value);
    } else {
      params.delete("title");
    }

    // شروع جست‌وجوی جدید از صفحه اول
    params.delete("page");

    const queryString = params.toString();

    router.push(queryString ? `/store?${queryString}` : "/store");
  }

  function handleClear() {
    setSearch("");

    const params = new URLSearchParams(searchParams.toString());

    params.delete("title");
    params.delete("page");

    const queryString = params.toString();

    router.push(queryString ? `/store?${queryString}` : "/store");
  }

  return (
    <form
      onSubmit={handleSearch}
      role="search"
      className="flex w-full rtl max-w-md items-center gap-2
       rounded-xl border border-gray-300 bg-white
        px-3 py-2 shadow-sm transition focus-within:border-blue-500
         focus-within:ring-2 focus-within:ring-blue-100"
    >
      <span className="shrink-0 text-gray-400">
        <SearchIcon />
      </span>

      <input
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="جست‌وجوی محصولات..."
        aria-label="جست‌وجوی محصولات"
        className="min-w-0 flex-1 bg-transparent text-sm
         text-gray-800 outline-none placeholder:text-gray-400 
         appearance:none [&::-webkit-search-cancel-button]:hidden"
      />

      {search && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="پاک کردن جست‌وجو"
          className="shrink-0 rounded-md p-1 text-gray-400
           transition hover:bg-gray-100 hover:text-gray-700"
        >
          <ClearIcon />
        </button>
      )}

      <button
        type="submit"
        className="shrink-0 rounded-lg bg-blue-600 px-4 py-2
         text-sm font-medium text-white transition hover:bg-blue-700"
      >
        جست‌وجو
      </button>
    </form>
  );
}
