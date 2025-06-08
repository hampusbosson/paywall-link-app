import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { paths } from "../config/paths";
import LandingPage from "./routes/landing";
import LoginPage from "./routes/auth/login";
import SignupPage from "./routes/auth/signup";
import ResetPasswordPage from "./routes/auth/reset-password";
import VerifyEmailPage from "./routes/auth/verify-email";
import RequestResetPasswordPage from "./routes/auth/request-reset-password";
import Dashboard from "./routes/app/dashboard";
import ProtectedRoute from "./routes/protected-route";
import GuestRoute from "./routes/guest-route";
import CreateLinkPage from "./routes/app/create-link";
import LinkDetailsPage from "./routes/app/link-details";
import AppLayout from "./app-layout";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={paths.landing.home.path}
          element={
            <GuestRoute>
              <LandingPage />
            </GuestRoute>
          }
        />
        <Route
          path={paths.auth.login.path}
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />
        <Route
          path={paths.auth.signup.path}
          element={
            <GuestRoute>
              <SignupPage />
            </GuestRoute>
          }
        />
        <Route
          path={paths.auth.reset.path}
          element={
            <GuestRoute>
              <ResetPasswordPage />
            </GuestRoute>
          }
        />
        <Route
          path={paths.auth.verify.path}
          element={
            <GuestRoute>
              <VerifyEmailPage />
            </GuestRoute>
          }
        />
        <Route
          path={paths.auth.resetPassword.path}
          element={
            <GuestRoute>
              <RequestResetPasswordPage />
            </GuestRoute>
          }
        />
        <Route
          path={paths.app.home.path}
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="create" element={<CreateLinkPage />} />
          <Route path="link/:id" element={<LinkDetailsPage />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
