"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../context/AuthContext";
import { Toaster } from "@/components/ui/sonner";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}
        <Toaster position="top-center" />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default MainLayout;
