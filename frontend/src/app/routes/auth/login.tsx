import React from "react";
import { login, getUserFromSession } from "../../../lib/auth";
import useAuth from "../../../hooks/auth/useAuth";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AxiosError } from "axios";
import { paths } from "../../../config/paths";

const schema = z.object({
  email: z.string().email("Please provide a valid email address."),
  password: z.string(),
});

type FormFields = z.infer<typeof schema>;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { email, password } = data;

    try {
      await login(email, password); // Backend login request

      const userData = await getUserFromSession();
      setUser(userData);

      navigate(paths.app.home.getHref()); // Redirect only on success
    } catch (error) {
      // Handle errors and set them in the form
      if (error instanceof AxiosError && error.response?.data?.message) {
        const backendErrorMessage = error.response.data.message;
        setError("root", {
          type: "server",
          message: backendErrorMessage,
        });
      } else {
        // Handle other errors or unexpected cases
        setError("root", {
          type: "server",
          message: "An unexpected error occurred. Please try again.",
        });
      }
    }
  };

  const resetPasswordRedirect = () => navigate(paths.auth.resetPassword.getHref());

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D1117] px-4">
      <div className="bg-[#161b22] border border-white/10 backdrop-blur-lg rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-white text-center">
          Welcome back
        </h2>
        <p className="text-sm text-gray-400 text-center">
          Sign in to access your dashboard
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="block text-sm text-gray-300 mb-1">
              Email address
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 mb-6 rounded-lg bg-[#0D1117] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <div className="text-red-500 text-xs w-72 text-left -mt-4">
                {errors.email.message}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-[#0D1117] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <div className="text-red-500 text-xs w-72 text-left -mt-4">
                {errors.password.message}
              </div>
            )}

            {errors.root && (
              <div className="text-red-500 text-xs w-72 text-left mt-1">
                {errors.root.message}
              </div>
            )}
          </div>
          <button
            className="underline mb-8 mt-2 text-left text-sm pl-1 font-medium text-gray-300"
            onClick={resetPasswordRedirect}
            type="button"
          >
            Forgot your password?
          </button>

          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full py-3 rounded-lg bg-primary text-white font-semibold hover:bg-blue-600 transition"
          >
            {isSubmitting ? "Loading..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <a
            href={paths.auth.signup.path}
            className="text-blue-400 hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
