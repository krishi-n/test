import UploadForm from '../../../components/UploadForm';

export default function UploadPage() {
  return (
    <main>
      <h1 className="text-2xl font-bold">Upload Bundle</h1>
      <p className="mt-2 text-neutral-300">Upload a bundle.json file to publish it here.</p>
      <div className="mt-6">
        <UploadForm />
      </div>
    </main>
  );
}
