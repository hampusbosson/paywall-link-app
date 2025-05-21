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

  const resetPasswordRedirect = () =>
    navigate(paths.auth.resetPassword.getHref());

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900 text-center">
          Välkommen tillbaka
        </h2>
        <p className="text-sm text-gray-600 text-center">
          Logga in för att komma åt din kontrollpanel
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              E-postadress
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              placeholder="du@exempel.se"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && (
              <div className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </div>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Lösenord
            </label>
            <input
              {...register("password")}
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.password && (
              <div className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </div>
            )}
            {errors.root && (
              <div className="text-red-500 text-xs mt-1">
                {errors.root.message}
              </div>
            )}
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <button
              type="button"
              onClick={resetPasswordRedirect}
              className="text-sm text-blue-600 hover:underline"
            >
              Glömt lösenord?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            {isSubmitting ? "Laddar..." : "Logga in"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Har du inget konto?{" "}
          <a
            href={paths.auth.signup.path}
            className="text-blue-600 hover:underline"
          >
            Skapa konto
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
