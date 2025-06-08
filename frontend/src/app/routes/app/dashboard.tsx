import React, { useState, useEffect } from "react";
import { logout } from "../../../lib/auth";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../config/paths";
import useAuth from "../../../hooks/auth/useAuth";
import { Link } from "../../../types/api";
import { fetchLinksForUser } from "../../../lib/links";
import { Link as RouterLink } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { setUser, user } = useAuth();

  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLinksForUser()
      .then(setLinks)
      .catch(() => console.log("Kunde inte hämta länkar"))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate(paths.landing.home.path);
    } catch (err) {
      console.error(err);
    }
  };

  const totalViews = links.reduce((sum, l) => sum + (l.views || 0), 0);
  const totalEarnings = links.reduce((sum, l) => sum + (l.price || 0), 0);

  return (
    <div className="min-h-screen bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Välkommen tillbaka, {user?.email}
          </h1>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow border">
            <p className="text-sm text-gray-500">Totala länkar</p>
            <h2 className="text-xl font-bold text-black">{links.length}</h2>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border">
            <p className="text-sm text-gray-500">Totala visningar</p>
            <h2 className="text-xl font-bold text-black">{totalViews}</h2>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border">
            <p className="text-sm text-gray-500">Total försäljning</p>
            <h2 className="text-xl font-bold text-black">{totalEarnings} kr</h2>
          </div>
        </div>

        <div className="flex justify-end">
          <a
            href={paths.app.create.path}
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            + Skapa ny länk
          </a>
        </div>

        {/* Links List */}
        <div className="grid gap-6 md:grid-cols-2 grid-cols-1">
          {links.map((link) => (
            <RouterLink
              to={paths.app.details.getHref(link.id)}
              key={link.id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-2 hover:shadow-md transition block"
            >
              <h3 className="text-lg font-semibold text-gray-900">{link.title}</h3>
              <p className="text-sm text-gray-600 truncate max-w-full">
                {link.targetUrl}
              </p>
              <p className="text-sm text-gray-500">Pris: {link.price} kr</p>
              <p className="text-sm text-gray-500">Visningar: {link.views}</p>
              <p className="text-sm text-gray-400">
                Skapad: {link.createdAt.slice(0, 10)}
              </p>
            </RouterLink>
          ))}
        </div>

        <div className="flex justify-center pt-8">
          <button onClick={handleLogout} className="text-sm text-blue-600 hover:underline">
            Logga ut
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;