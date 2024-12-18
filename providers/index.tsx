"use client";
import FirebaseProvider from "@/providers/FirebaseProvider";
import ShoppingListProvider from "@/contexts/ShoppingListContext";
import { Toaster } from "@/components/ui/sonner";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ShoppingListProvider>
      <FirebaseProvider>{children}</FirebaseProvider>
      <Toaster />
    </ShoppingListProvider>
  );
};

export default Providers;
