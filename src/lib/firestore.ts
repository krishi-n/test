import { collection, getDocs, getDoc, doc, query, where, limit as qlimit } from 'firebase/firestore';
import { db } from './firebase';
import type { Bundle } from '../types';

export async function fetchBundles({ search, category, limit = 20 }: { search?: string; category?: string; limit?: number }) {
  try {
    if (!db) return [] as Bundle[];
    let qRef = collection(db, 'bundles');
    let q = query(qRef, qlimit(limit));
    if (category) q = query(qRef, where('categories', 'array-contains', category), qlimit(limit));
    const snap = await getDocs(q);
    let bundles = snap.docs.map((d) => d.data() as Bundle);
    if (search) {
      const s = search.toLowerCase();
      bundles = bundles.filter((b) => b.name?.toLowerCase().includes(s) || b.description?.toLowerCase().includes(s));
    }
    return bundles;
  } catch (e) {
    return [] as Bundle[];
  }
}

export async function fetchBundleById(id: string) {
  try {
    if (!db) return null;
    const ref = doc(db, 'bundles', id);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return snap.data() as Bundle;
  } catch (e) {
    return null;
  }
}
