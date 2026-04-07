import { NextResponse } from 'next/server';
import { fetchBundles } from '../../../lib/firestore';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ bundles: [] });
  }
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search') || undefined;
  const category = searchParams.get('category') || undefined;
  const bundles = await fetchBundles({ search, category });
  return NextResponse.json({ bundles });
}

export async function POST(req: Request) {
  const body = await req.json();
  if (!body?.id || !body?.name) {
    return NextResponse.json({ error: 'id and name required' }, { status: 400 });
  }
  // Client SDK write not supported in route handler without credentials.
  return NextResponse.json({ ok: true, bundle: body });
}
