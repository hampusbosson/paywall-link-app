import React from "react";

const RequestResetPasswordPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D1117] px-4">
      <div className="bg-[#161b22] border border-white/10 backdrop-blur-lg rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-white text-center">Reset your password</h2>
        <p className="text-sm text-gray-400 text-center">Enter your email and we’ll send you a reset link</p>

        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-300 mb-1">
              Email address
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg bg-[#0D1117] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
          >
            Send Reset Link
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Remembered your password? <a href="#" className="text-blue-400 hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default RequestResetPasswordPage;