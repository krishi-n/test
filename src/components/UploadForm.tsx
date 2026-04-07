'use client';

import { useState } from 'react';
import { addBundle } from '../lib/firestore-client';

export default function UploadForm() {
  const [jsonText, setJsonText] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    try {
      const data = JSON.parse(jsonText);
      if (!data.id || !data.name) throw new Error('Bundle must include id and name');
      await addBundle(data);
      setStatus('Bundle uploaded successfully');
      setJsonText('');
    } catch (err: any) {
      setStatus(err.message || 'Upload failed');
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <textarea
        className="h-56 w-full rounded border border-neutral-800 bg-neutral-950 p-3 text-sm"
        placeholder="Paste bundle.json here"
        value={jsonText}
        onChange={(e) => setJsonText(e.target.value)}
      />
      <button className="rounded bg-blue-600 px-4 py-2 text-sm hover:bg-blue-500" type="submit">
        Upload
      </button>
      {status && <div className="text-sm text-neutral-300">{status}</div>}
    </form>
  );
}
