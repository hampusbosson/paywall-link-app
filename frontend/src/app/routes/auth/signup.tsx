import React from "react";
import { paths } from "../../../config/paths";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { signup } from "../../../lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z
  .object({
    email: z.string().email("Please provide a valid email address."),
    password: z
      .string()
      .min(7, "Password must be at least 7 characters long.")
      .regex(/[0-9]/, "Password must contain at least one number.")
      .regex(/[a-zA-Z]/, "Password must contain at least one letter."),
    repeatedPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatedPassword, {
    message: "Passwords must match.",
    path: ["repeatedPassword"], // Points to the field with the issue
  });

type FormFields = z.infer<typeof schema>;

const SignupPage: React.FC = () => {
  const navigate = useNavigate();

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
      await signup(email, password);

      navigate(paths.auth.verify.getHref(), { state: { email, password } });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;

      if (axiosError.message) {
        // Use the backend error message
        setError("root", {
          type: "server",
          message: axiosError.message, // Display the backend error message
        });
      } else {
        // Fallback for unexpected errors
        setError("root", {
          type: "server",
          message: "An unexpected error occurred. Please try again.",
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900 text-center">
          Skapa ditt konto
        </h2>
        <p className="text-sm text-gray-600 text-center">
          Registrera dig för att börja använda PaywallLink
        </p>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm text-gray-700 mb-1">
              E-postadress
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              placeholder="du@exempel.se"
              className="w-full py-2 px-4 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="block text-sm text-gray-700 mb-1"
            >
              Lösenord
            </label>
            <input
              {...register("password")}
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full py-2 px-4 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <div className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </div>
            )}
          </div>

          {/* Repeat Password */}
          <div>
            <label
              htmlFor="repeat-password"
              className="block text-sm text-gray-700 mb-1"
            >
              Upprepa lösenord
            </label>
            <input
              {...register("repeatedPassword")}
              type="password"
              id="repeat-password"
              placeholder="••••••••"
              className="w-full py-2 px-4 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.repeatedPassword && (
              <div className="text-red-500 text-xs mt-1">
                {errors.repeatedPassword?.message}
              </div>
            )}
            {errors.root && (
              <div className="text-red-500 text-xs mt-1">
                {errors.root.message}
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full py-3 px-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            {isSubmitting ? "Laddar..." : "Skapa konto"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Har du redan ett konto?{" "}
          <a
            href={paths.auth.login.path}
            className="text-blue-600 hover:underline"
          >
            Logga in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
