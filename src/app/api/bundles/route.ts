import { NextResponse } from 'next/server';
import { fetchBundles } from '../../../lib/firestore';
import { readBundles, upsertBundle } from '../../../lib/local-store';

export const dynamic = 'force-dynamic';

const useLocal = process.env.USE_LOCAL_STORE === '1';

export async function GET(req: Request) {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ bundles: [] });
  }
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search') || undefined;
  const category = searchParams.get('category') || undefined;

  let bundles = useLocal ? await readBundles() : await fetchBundles({ search, category });
  if (useLocal) {
    if (search) {
      const s = search.toLowerCase();
      bundles = bundles.filter((b: any) => b.name?.toLowerCase().includes(s) || b.description?.toLowerCase().includes(s));
    }
    if (category) {
      bundles = bundles.filter((b: any) => (b.categories || []).includes(category));
    }
  }
  return NextResponse.json({ bundles });
}

export async function POST(req: Request) {
  const body = await req.json();
  if (!body?.id || !body?.name) {
    return NextResponse.json({ error: 'id and name required' }, { status: 400 });
  }
  if (useLocal) {
    const saved = await upsertBundle(body);
    return NextResponse.json({ ok: true, bundle: saved });
  }
  return NextResponse.json({ ok: true, bundle: body });
}
