import React from "react";

const ResetPasswordPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900 text-center">
          Sätt ett nytt lösenord
        </h2>
        <p className="text-sm text-gray-600 text-center">
          Ange och bekräfta ditt nya lösenord
        </p>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="new-password"
              className="block text-sm text-gray-700 mb-1"
            >
              Nytt lösenord
            </label>
            <input
              type="password"
              id="new-password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm text-gray-700 mb-1"
            >
              Bekräfta lösenord
            </label>
            <input
              type="password"
              id="confirm-password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Uppdatera lösenord
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Behöver du hjälp?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Kontakta support
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
