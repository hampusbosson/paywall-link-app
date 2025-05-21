import React from "react";
import { logout } from "../../../lib/auth";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../config/paths";
import useAuth from "../../../hooks/auth/useAuth";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate(paths.landing.home.path);
    } catch (err) {
      console.error(err);
    }
  };

  const user = {
    name: "Hampus",
    email: "hampus@example.com",
  };

  const links = [
    {
      id: "abc123",
      title: "Notion CV-mall",
      url: "https://paywall.se/u/abc123",
      views: 42,
      createdAt: "2024-05-20",
      price: 59,
    },
    {
      id: "xyz789",
      title: "AI Prompt Pack",
      url: "https://paywall.se/u/xyz789",
      views: 12,
      createdAt: "2024-05-15",
      price: 89,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Välkommen tillbaka, {user.name}
          </h1>
          <p className="text-sm text-gray-600">Här är dina aktiva länkar</p>
        </div>

        <div className="flex justify-end">
          <a
            href={paths.app.create.path}
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            + Skapa ny länk
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {links.map((link) => (
            <div
              key={link.id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-2"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {link.title}
              </h3>
              <p className="text-sm text-gray-600">{link.url}</p>
              <p className="text-sm text-gray-500">Pris: {link.price} kr</p>
              <p className="text-sm text-gray-500">Visningar: {link.views}</p>
              <p className="text-sm text-gray-400">Skapad: {link.createdAt}</p>
            </div>
          ))}
        </div>
      </div>
      <button
      onClick={handleLogout} className="text-black">
        logga ut
      </button>
    </div>
  );
};

export default Dashboard;
