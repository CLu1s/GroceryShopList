"use client";

import { createFirebaseApp } from "@/firebase/firebase-config";

const FirebaseProvider = ({ children }: { children: React.ReactNode }) => {
  const app = createFirebaseApp();

  return children;
};

export default FirebaseProvider;
