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
    <div className="min-h-screen flex items-center justify-center bg-[#0D1117] px-4">
      <div className="bg-[#161b22] border border-white/10 backdrop-blur-lg rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-white text-center">
          Create your account
        </h2>
        <p className="text-sm text-gray-400 text-center">
          Sign up to start using LucidView
        </p>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="block text-sm text-gray-300 mb-1">
              Email Adress
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              placeholder="you@example.com"
              className="w-full py-2 px-4 rounded-lg bg-[#0D1117] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <div className="text-red-500 text-xs w-72 text-left mt-1">
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
              className="w-full py-2 px-4 rounded-lg bg-[#0D1117] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <div className="text-red-500 text-xs w-72 text-left mt-1">
                {errors.password.message}
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="repeat-password"
              className="block text-sm text-gray-300 mb-1"
            >
              Repeat Password
            </label>
            <input
              {...register("repeatedPassword")}
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full py-2 px-4 rounded-lg mb-2 bg-[#0D1117] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.repeatedPassword && (
              <div className="text-red-500 text-xs w-72 text-left -mt-1">
                {errors.repeatedPassword?.message}
              </div>
            )}

            {errors.root && (
              <div className="text-red-500 text-xs w-72 text-left -mt-1">
                {errors.root.message}
              </div>
            )}
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full py-3 px-4 rounded-lg bg-primary text-white font-semibold hover:bg-blue-600 transition"
          >
            {isSubmitting ? "Loading..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a
            href={paths.auth.login.path}
            className="text-blue-400 hover:underline"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
