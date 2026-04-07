'use client';

import BundleGrid from '../../components/BundleGrid';
import SearchBar from '../../components/SearchBar';
import CategoryFilter from '../../components/CategoryFilter';
import { useBundles } from '../../hooks/useBundles';
import { useSearchParams } from 'next/navigation';

export default function BundlesPage() {
  const { bundles } = useBundles();
  const params = useSearchParams();
  const q = params.get('q') || '';
  const category = params.get('category') || undefined;

  const filtered = bundles.filter((b) => {
    const matchQ = !q || b.name?.toLowerCase().includes(q.toLowerCase()) || b.description?.toLowerCase().includes(q.toLowerCase());
    const matchC = !category || b.categories?.includes(category);
    return matchQ && matchC;
  });

  return (
    <main>
      <h1 className="text-2xl font-bold">All Bundles</h1>
      <div className="mt-4 flex flex-col gap-4">
        <SearchBar initialQuery={q} />
        <CategoryFilter active={category} />
      </div>
      <div className="mt-6">
        <BundleGrid bundles={filtered} />
      </div>
    </main>
  );
}
