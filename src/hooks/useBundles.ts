'use client';

import { useEffect, useState } from 'react';
import type { Bundle } from '../types';

export function useBundles() {
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/bundles')
      .then((r) => r.json())
      .then((d) => setBundles(d.bundles || []))
      .finally(() => setLoading(false));
  }, []);

  return { bundles, loading };
}
