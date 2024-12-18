import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

export function initializeTestEnvironment() {
  const app = initializeApp({
    projectId: "demo-test-project",
  });

  const db = getFirestore(app);
  connectFirestoreEmulator(db, "localhost", 8080);

  return { app, db };
}
