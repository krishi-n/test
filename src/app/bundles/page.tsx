import { Suspense } from 'react';
import BundlesClient from '../../components/BundlesClient';

export const dynamic = 'force-dynamic';

export default function BundlesPage() {
  return (
    <main>
      <h1 className="text-2xl font-bold">All Bundles</h1>
      <Suspense fallback={<div className="text-neutral-400 mt-4">Loading...</div>}>
        <BundlesClient />
      </Suspense>
    </main>
  );
}
