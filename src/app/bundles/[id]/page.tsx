'use client';

import BundleDetail from '../../../components/BundleDetail';
import { useBundle } from '../../../hooks/useBundle';

export default function BundleDetailPage({ params }: { params: { id: string } }) {
  const { bundle, loading } = useBundle(params.id);
  if (loading) return <div className="text-neutral-400">Loading...</div>;
  if (!bundle) return <div className="text-red-400">Bundle not found.</div>;
  return (
    <main>
      <BundleDetail bundle={bundle} />
    </main>
  );
}
