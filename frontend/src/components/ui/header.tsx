import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full py-6 border-b border-1 border-gray-700 fixed backdrop z-50">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="text-xl font-semibold text-white tracking-tight hover:cursor-pointer" onClick={() => console.log("Logo clicked")}>
          LucidView
        </div>
        <nav className="space-x-6">
          <button className="hover:text-white text-sm">
            Features
          </button>
          <button className="hover:text-white text-sm">
            Demo
          </button>
          <button className="hover:text-white text-sm">
            Pricing
          </button>
        </nav>
        <div className="flex items-center space-x-4">
          <Link
            to="/signup"
            className="px-4 py-1.5 bg-primary text-white rounded-lg hover:bg-blue-600 transition text-sm"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="px-4 py-1.5 rounded-lg hover:bg-gray-700 transition text-sm"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
