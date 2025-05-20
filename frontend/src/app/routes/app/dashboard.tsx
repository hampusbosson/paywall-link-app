import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0D1117] px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-white">Welcome back 👋</h1>
          <p className="text-gray-400 text-sm mt-2">Your recent landing page analyses</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-[#161b22] border border-white/10 backdrop-blur-md rounded-xl p-6 shadow hover:shadow-lg transition"
            >
              <h3 className="text-white font-semibold mb-2">example.com</h3>
              <p className="text-sm text-gray-400 mb-4">Analyzed on April 28, 2025</p>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-sm rounded bg-blue-500 text-white font-medium hover:bg-blue-600 transition">
                  View Feedback
                </button>
                <button className="px-4 py-2 text-sm rounded border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition">
                  Download HTML
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
