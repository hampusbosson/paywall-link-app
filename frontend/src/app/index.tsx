import React from "react";
import AppRouter from "./router";
import { AppProviders } from "./provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();


const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProviders>
        <AppRouter />
      </AppProviders>
    </QueryClientProvider>
  );
}

export default App;
