import React from "react";
import { AuthProvider } from "../hooks/auth/auth-context";

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <AuthProvider>{children}</AuthProvider>;
};
