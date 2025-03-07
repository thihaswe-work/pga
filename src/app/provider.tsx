import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import React from "react";
type AppProviderProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default AppProvider;
