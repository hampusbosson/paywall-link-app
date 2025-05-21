import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full py-6 border-b border-gray-200 fixed bg-white/40 backdrop-blur z-50">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div
          className="text-xl font-bold text-gray-900 hover:cursor-pointer"
          onClick={() => (window.location.href = "/")}
        >
          PaywallLink
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6 text-sm text-gray-700">
          <a href="#how-it-works" className="hover:text-blue-600 transition">
            Så funkar det
          </a>
          <a
            href="#what-you-can-sell"
            className="hover:text-blue-600 transition"
          >
            Vad du kan sälja
          </a>
          <a href="#pricing" className="hover:text-blue-600 transition">
            Priser
          </a>
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center space-x-3 text-sm">
          <Link
            to="/login"
            className="px-4 py-1.5 rounded-lg hover:bg-gray-200 transition text-gray-800"
          >
            Logga in
          </Link>
          <Link
            to="/signup"
            className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Skapa konto
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
