import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export async function addBundle(bundle: any) {
  const ref = doc(collection(db, 'bundles'), bundle.id);
  await setDoc(ref, {
    ...bundle,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }, { merge: true });
}
