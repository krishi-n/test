import { NextResponse } from 'next/server';
import { fetchBundleById } from '../../../../lib/firestore';

export const dynamic = 'force-dynamic';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const bundle = await fetchBundleById(params.id);
  return NextResponse.json({ bundle });
}
