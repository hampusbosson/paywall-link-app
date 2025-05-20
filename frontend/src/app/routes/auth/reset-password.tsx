import React from "react";

const ResetPasswordPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D1117] px-4">
      <div className="bg-[#161b22] border border-white/10 backdrop-blur-lg rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-white text-center">Set a new password</h2>
        <p className="text-sm text-gray-400 text-center">Please enter and confirm your new password</p>

        <form className="space-y-4">
          <div>
            <label htmlFor="new-password" className="block text-sm text-gray-300 mb-1">
              New password
            </label>
            <input
              type="password"
              id="new-password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-[#0D1117] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-sm text-gray-300 mb-1">
              Confirm password
            </label>
            <input
              type="password"
              id="confirm-password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-[#0D1117] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
          >
            Update Password
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Need help? <a href="#" className="text-blue-400 hover:underline">Contact support</a>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
