import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  FieldValue,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  Query,
  QuerySnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export const incrementCounter = async (
  path: string,
  newCounts: Record<string, FieldValue>,
) => {
  const db = getFirestore();
  const counterRef = doc(db, path);
  try {
    await updateDoc(counterRef, newCounts);
  } catch (e) {
    console.log("incrementCounter error", e);
    await setDoc(counterRef, newCounts, { merge: true });
  }
  const counter = await getDoc(counterRef);
  if (counter.exists()) return counter.data();
  return false;
};

export const saveOnFirestore = async (path: string, data: any) => {
  const db = getFirestore();
  return setDoc(doc(db, path), data);
};

export const deleteFromFirestore = async (path: string) => {
  const db = getFirestore();
  return deleteDoc(doc(db, path));
};

export const updateFirestore = async (path: string, data: any) => {
  const db = getFirestore();
  try {
    await updateDoc(doc(db, path), data);
  } catch (e) {
    console.log("updateFirestore error", e);
    await setDoc(doc(db, path), data, { merge: true });
  }
  return updateDoc(doc(db, path), data);
};

export const readDocFromFirestore = async (path: string) => {
  const db = getFirestore();
  const docSnap = await getDoc(doc(db, path));
  return docSnap.data();
};

export const readDocsFromFirestore = async (path: string) => {
  const db = getFirestore();
  const querySnapshot = await getDocs(collection(db, path));
  return querySnapshot.docs.map((doc) => doc.data());
};

export const queryFirestore = async (
  query: Query<DocumentData, DocumentData>,
) => {
  const querySnapshot = await getDocs(query);
  return querySnapshot.docs.map((doc) => doc.data());
};

export const listenToFirestore = (
  query: Query<DocumentData, DocumentData>,
  callback: (querySnapshot: QuerySnapshot<DocumentData, DocumentData>) => void,
) => {
  return onSnapshot(query, callback);
};
