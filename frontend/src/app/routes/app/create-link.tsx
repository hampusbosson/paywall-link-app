import React from "react";

const CreateLinkPage: React.FC = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: connect with backend / form submission logic
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900 text-center">
          Skapa en ny länk
        </h2>
        <p className="text-sm text-gray-600 text-center">
          Fyll i formuläret nedan för att generera din betallänk
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm text-gray-700 mb-1">
              Titel
            </label>
            <input
              type="text"
              id="title"
              placeholder="Ex: CV-mall i Notion"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="targetUrl"
              className="block text-sm text-gray-700 mb-1"
            >
              Länk till innehåll
            </label>
            <input
              type="url"
              id="targetUrl"
              placeholder="https://notion.so/…"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm text-gray-700 mb-1">
              Pris (kr)
            </label>
            <input
              type="number"
              id="price"
              placeholder="Ex: 49"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="swishNumber"
              className="block text-sm text-gray-700 mb-1"
            >
              Ditt Swish-nummer
            </label>
            <input
              type="tel"
              id="swishNumber"
              placeholder="0701234567"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Skapa länk
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateLinkPage;
