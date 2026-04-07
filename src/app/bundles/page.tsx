import BundleGrid from '../../components/BundleGrid';
import SearchBar from '../../components/SearchBar';
import CategoryFilter from '../../components/CategoryFilter';
import { fetchBundles } from '../../lib/firestore';

export default async function BundlesPage({ searchParams }: { searchParams?: { q?: string; category?: string } }) {
  const bundles = await fetchBundles({ search: searchParams?.q, category: searchParams?.category });
  return (
    <main>
      <h1 className="text-2xl font-bold">All Bundles</h1>
      <div className="mt-4 flex flex-col gap-4">
        <SearchBar initialQuery={searchParams?.q || ''} />
        <CategoryFilter active={searchParams?.category} />
      </div>
      <div className="mt-6">
        <BundleGrid bundles={bundles} />
      </div>
    </main>
  );
}
