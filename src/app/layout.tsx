import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bundle Marketplace',
  description: 'AgentPlace-style bundle marketplace for testing',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-950 text-neutral-100">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <header className="mb-8 flex items-center justify-between">
            <div className="text-xl font-semibold">Bundle Marketplace</div>
            <nav className="flex gap-4 text-sm text-neutral-300">
              <a href="/" className="hover:text-white">Home</a>
              <a href="/bundles" className="hover:text-white">Bundles</a>
              <a href="/bundles/upload" className="hover:text-white">Upload</a>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
