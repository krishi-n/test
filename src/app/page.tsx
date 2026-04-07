'use client';

import BundleGrid from '../components/BundleGrid';
import { useBundles } from '../hooks/useBundles';

export default function Home() {
  const { bundles } = useBundles();
  return (
    <main>
      <section className="mb-10">
        <h1 className="text-3xl font-bold">Discover Agent Bundles</h1>
        <p className="mt-2 text-neutral-300">
          Browse curated bundles and install them with one command.
        </p>
      </section>
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Featured Bundles</h2>
          <a className="text-sm text-blue-400 hover:underline" href="/bundles">View all</a>
        </div>
        <BundleGrid bundles={bundles.slice(0,6)} />
      </section>
    </main>
  );
}
