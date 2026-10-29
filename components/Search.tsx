"use client";

import { Search as SearchIcon, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type SubmitEvent } from "react";

type SearchFormProps = {
  currentSearch: string;
};

function SearchForm({ currentSearch }: SearchFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(currentSearch);

  function navigate(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    const query = value.trim();

    if (query) {
      params.set("title", query);
    } else {
      params.delete("title");
    }

    params.delete("page");
    const queryString = params.toString();
    router.push(queryString ? `/store?${queryString}` : "/store");
  }

  function handleSearch(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate(search);
  }

  function handleClear() {
    setSearch("");
    navigate("");
  }

  return (
    <form
      onSubmit={handleSearch}
      role="search"
      className="flex w-full items-center gap-2 rounded-2xl border border-white/80 bg-white p-2 shadow-lg shadow-stone-900/5 transition focus-within:border-emerald-700 focus-within:ring-4 focus-within:ring-emerald-700/10"
    >
      <SearchIcon
        size={20}
        className="mr-2 shrink-0 text-stone-400"
        aria-hidden="true"
      />
      <input
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="جست‌وجوی محصولات..."
        aria-label="جست‌وجوی محصولات"
        className="min-w-0 flex-1 bg-transparent py-2 text-sm text-stone-800 outline-none placeholder:text-stone-400 [&::-webkit-search-cancel-button]:hidden"
      />
      {search && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="پاک کردن جست‌وجو"
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-full text-stone-400 transition hover:bg-stone-100 hover:text-stone-700"
        >
          <X size={17} aria-hidden="true" />
        </button>
      )}
      <button
        type="submit"
        className="shrink-0 rounded-xl bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
      >
        جست‌وجو
      </button>
    </form>
  );
}

export default function Search() {
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("title") ?? "";

  return <SearchForm key={currentSearch} currentSearch={currentSearch} />;
}
