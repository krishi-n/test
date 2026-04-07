import { NextResponse } from 'next/server';
import { fetchBundleById } from '../../../../lib/firestore';
import { getBundle } from '../../../../lib/local-store';

export const dynamic = 'force-dynamic';

const useLocal = process.env.USE_LOCAL_STORE === '1';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ bundle: null });
  }
  const bundle = useLocal ? await getBundle(params.id) : await fetchBundleById(params.id);
  return NextResponse.json({ bundle });
}
