'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function SearchBar({ initialQuery }: { initialQuery: string }) {
  const router = useRouter();
  const params = useSearchParams();
  const [q, setQ] = useState(initialQuery);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const category = params.get('category');
    const url = new URL(window.location.href);
    url.searchParams.set('q', q);
    if (category) url.searchParams.set('category', category);
    router.push(`/bundles?${url.searchParams.toString()}`);
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        className="w-full rounded border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm"
        placeholder="Search bundles..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <button className="rounded bg-blue-600 px-4 py-2 text-sm hover:bg-blue-500" type="submit">
        Search
      </button>
    </form>
  );
}
