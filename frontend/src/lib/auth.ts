import { apiClient } from "./api-client";
import { User, ApiResponse } from "../types/api";
import type { AxiosRequestConfig } from "axios";

const api = apiClient;

/**
 * Signup a new user.
 */
export async function signup(email: string, password: string): Promise<User> {
  try {
    const response = await api.post<ApiResponse>("/auth/signup", {
      email,
      password,
    });
    return response.data.user;
  } catch (error) {
    console.error("Signup failed:", error);
    throw error;
  }
}

/**
 * Verify user email with OTP.
 * Returns true if no error is thrown.
 */
export async function verifyEmail(email: string, otp: string): Promise<boolean> {
  try {
    await api.post<ApiResponse>("/auth/verify-email", { email, otp });
    return true;
  } catch (error) {
    console.error("Email verification failed:", error);
    throw error;
  }
}

/**
 * Resend OTP for email verification.
 * Returns true if the request succeeds.
 */
export async function resendOTP(email: string): Promise<boolean> {
  try {
    await api.post<ApiResponse>("/auth/resend-otp", { email });
    return true;
  } catch (error) {
    console.error("Resend OTP failed:", error);
    throw error;
  }
}

/**
 * Login a user.
 * Returns the token from the backend.
 */
export async function login(email: string, password: string): Promise<string> {
  try {
    const response = await api.post<{ token: string }>("/auth/login", {
      email,
      password,
    });
    return response.data.token;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}

/**
 * Get the user from the current session (via cookies).
 */
export async function getUserFromSession(): Promise<User> {
  try {
    const response = await api.get<ApiResponse>("/auth/session", {
      requiresAuth: true,
    } as AxiosRequestConfig & { requiresAuth: boolean });
    return response.data.user;
  } catch (error) {
    console.error("Fetching session user failed:", error);
    throw error;
  }
}

/**
 * Logout the user.
 */
export async function logout(): Promise<void> {
  try {
    await api.post("/auth/logout", {}, {
      requiresAuth: true,
    } as AxiosRequestConfig & { requiresAuth: boolean });
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
}

/**
 * Send a reset password link to the user's email.
 */
export async function sendResetPasswordLink(email: string): Promise<void> {
  try {
    await api.post("/auth/reset-password/request", { email });
  } catch (error) {
    console.error("Sending reset password link failed:", error);
    throw error;
  }
}

/**
 * Reset password with the provided token and new password.
 */
export async function resetPassword(token: string | null, newPassword: string): Promise<void> {
  try {
    await api.post("/auth/reset-password", { token, newPassword });
  } catch (error) {
    console.error("Resetting password failed:", error);
    throw error;
  }
}