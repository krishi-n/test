import { fetchBundleById } from '../../../lib/firestore';
import BundleDetail from '../../../components/BundleDetail';

export default async function BundleDetailPage({ params }: { params: { id: string } }) {
  const bundle = await fetchBundleById(params.id);
  if (!bundle) {
    return <div className="text-red-400">Bundle not found.</div>;
  }
  return (
    <main>
      <BundleDetail bundle={bundle} />
    </main>
  );
}
