import type { Bundle } from '../types';

export default function BundleDetail({ bundle }: { bundle: Bundle }) {
  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-6">
      <h1 className="text-2xl font-bold">{bundle.name}</h1>
      <p className="mt-2 text-neutral-300">{bundle.description}</p>
      <div className="mt-4 text-sm text-neutral-400">Bundle ID: {bundle.id}</div>
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Agents</h2>
        <ul className="mt-2 space-y-2 text-sm">
          {bundle.agents?.map((a) => (
            <li key={a.id} className="rounded border border-neutral-800 bg-neutral-950 px-3 py-2">
              <div className="font-medium">{a.id}</div>
              <div className="text-neutral-400">version: {a.version || a.versionSpec || 'latest'}</div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 rounded bg-neutral-950 p-3 text-sm text-neutral-300">
        Install: <code>bundle-manager install {bundle.id} --registry https://your-domain</code>
      </div>
    </div>
  );
}
