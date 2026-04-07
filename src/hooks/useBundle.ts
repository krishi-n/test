'use client';

import { useEffect, useState } from 'react';
import type { Bundle } from '../types';

export function useBundle(id: string) {
  const [bundle, setBundle] = useState<Bundle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/bundles/${id}`)
      .then((r) => r.json())
      .then((d) => setBundle(d.bundle || null))
      .finally(() => setLoading(false));
  }, [id]);

  return { bundle, loading };
}
