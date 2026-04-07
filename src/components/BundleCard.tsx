import Link from 'next/link';
import type { Bundle } from '../types';

export default function BundleCard({ bundle }: { bundle: Bundle }) {
  return (
    <Link href={`/bundles/${bundle.id}`} className="block rounded-lg border border-neutral-800 bg-neutral-900 p-4 hover:border-neutral-700">
      <div className="text-lg font-semibold">{bundle.name}</div>
      <div className="mt-1 text-sm text-neutral-400">{bundle.description || 'No description'}</div>
      <div className="mt-3 flex flex-wrap gap-2 text-xs text-neutral-400">
        {bundle.tags?.slice(0, 4).map((tag) => (
          <span key={tag} className="rounded bg-neutral-800 px-2 py-1">{tag}</span>
        ))}
      </div>
      <div className="mt-3 text-xs text-neutral-500">Agents: {bundle.agents?.length || 0}</div>
    </Link>
  );
}
