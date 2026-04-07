'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const CATEGORIES = ['marketing', 'devops', 'content', 'analytics', 'product'];

export default function CategoryFilter({ active }: { active?: string }) {
  const router = useRouter();
  const params = useSearchParams();

  function setCategory(cat?: string) {
    const url = new URL(window.location.href);
    if (cat) url.searchParams.set('category', cat);
    else url.searchParams.delete('category');
    const q = params.get('q');
    if (q) url.searchParams.set('q', q);
    router.push(`/bundles?${url.searchParams.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => setCategory(undefined)}
        className={`rounded px-3 py-1 text-xs ${!active ? 'bg-blue-600' : 'bg-neutral-800'}`}
      >
        All
      </button>
      {CATEGORIES.map((c) => (
        <button
          key={c}
          onClick={() => setCategory(c)}
          className={`rounded px-3 py-1 text-xs ${active === c ? 'bg-blue-600' : 'bg-neutral-800'}`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
