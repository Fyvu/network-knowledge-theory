'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const defaultTerm = searchParams.get('topic') || '';

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const term = formData.get('search') as string;
    if (term?.trim()) {
      router.push(`/?topic=${encodeURIComponent(term.trim())}`);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form
        key={defaultTerm}
        onSubmit={handleSearch}
        className="relative flex items-center w-full h-12 rounded-full shadow-md focus-within:shadow-lg bg-white overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-200"
      >
        <div className="grid place-items-center h-full w-12 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          className="peer h-full w-full outline-none text-base text-gray-700 pr-4 placeholder-gray-500 bg-transparent"
          type="text"
          id="search"
          name="search"
          placeholder="Search topic..."
          defaultValue={defaultTerm}
        />
      </form>
    </div>
  );
}
