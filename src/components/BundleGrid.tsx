import type { Bundle } from '../types';
import BundleCard from './BundleCard';

export default function BundleGrid({ bundles }: { bundles: Bundle[] }) {
  if (!bundles?.length) {
    return <div className="text-neutral-400">No bundles found.</div>;
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {bundles.map((b) => (
        <BundleCard key={b.id} bundle={b} />
      ))}
    </div>
  );
}
