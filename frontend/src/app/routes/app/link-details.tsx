import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "../../../types/api";
import { getLinkById } from "../../../lib/links";

const LinkDetailsPage: React.FC = () => {
  const { id } = useParams();
  const [link, setLink] = useState<Link | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; // prevents calling API with undefined

    const fetchLink = async () => {
      try {
        const response = await getLinkById(id);
        setLink(response);
      } catch (err) {
        console.error(err);
        setError("Kunde inte hämta länkinformation.");
      } finally {
        setLoading(false);
      }
    };
    fetchLink();
  }, [id]);

  if (loading) return <p className="text-center py-8">Laddar...</p>;
  if (error) return <p className="text-center text-red-500 py-8">{error}</p>;
  if (!link) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{link.title}</h2>
        <div className="space-y-2 max-w-full">
          <p className="text-sm text-gray-700 flex items-center">
            <strong className="mr-1">Länk:</strong>{" "}
            <a
              href={link.targetUrl}
              className="text-blue-600 hover:underline truncate max-w-full"
              target="_blank"
              rel="noopener noreferrer"
              title={link.targetUrl}
            >
              {link.targetUrl}
            </a>
          </p>
          <p className="text-sm text-gray-700">
            <strong>Pris:</strong> {link.price} kr
          </p>
          <p className="text-sm text-gray-700">
            <strong>Swish-nummer:</strong> {link.swishNumber}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Antal visningar:</strong> {link.views}
          </p>
          <p className="text-sm text-gray-500">
            <strong>Skapad:</strong>{" "}
            {new Date(link.createdAt).toLocaleDateString("sv-SE")}
          </p>
          <hr />
          <p className="text-sm text-gray-900">
            <strong>Offentlig länk:</strong>{" "}
            <code className="bg-gray-100 px-2 py-1 rounded">
              https://paywall.se/u/{link.id}
            </code>
          </p>
        </div>
        <button
          onClick={() =>
            navigator.clipboard.writeText(`https://paywall.se/u/${link.id}`)
          }
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Kopiera länk
        </button>
      </div>
    </div>
  );
};

export default LinkDetailsPage;
