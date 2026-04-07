import { promises as fs } from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data');
const FILE = path.join(DATA_PATH, 'bundles.json');

export async function readBundles(): Promise<any[]> {
  try {
    const raw = await fs.readFile(FILE, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export async function writeBundles(bundles: any[]) {
  await fs.mkdir(DATA_PATH, { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(bundles, null, 2), 'utf8');
}

export async function upsertBundle(bundle: any) {
  const bundles = await readBundles();
  const idx = bundles.findIndex((b: any) => b.id === bundle.id);
  if (idx >= 0) bundles[idx] = bundle;
  else bundles.push(bundle);
  await writeBundles(bundles);
  return bundle;
}

export async function getBundle(id: string) {
  const bundles = await readBundles();
  return bundles.find((b: any) => b.id === id) || null;
}
