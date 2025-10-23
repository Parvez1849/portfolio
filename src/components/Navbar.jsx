// src/components/Navbar.jsx
import React, { useState } from 'react'; // <-- useState import karein
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { authState, logout } = useAuth();
  const { isAuthenticated, user } = authState;

  // 1. Mobile menu ke liye state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false); // Logout par menu band karein
    navigate('/login');
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isUserPortfolioPage = location.pathname === '/professionals';

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto">
        {/* --- Top Bar: Logo aur Hamburger Icon --- */}
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold hover:text-theme-yellow"
            onClick={closeMenu}
          >
            Portfolio Generator
          </Link>

          {/* --- Desktop Menu (Sirf bade screens par dikhega) --- */}
          <div className="hidden md:flex space-x-6 items-center">
            {/* Public Gallery - Always Visible */}
            <Link
              to="/gallery"
              className="text-lg font-medium hover:text-gray-300"
            >
              Public Gallery
            </Link>

            {/* Conditional Links based on Login Status */}
            {isAuthenticated ? (
              <>
                <Link
                  to="/"
                  className="text-lg font-medium hover:text-gray-300"
                >
                  Create New
                </Link>

                {!isUserPortfolioPage && (
                  <Link
                    to="/professionals"
                    className="text-lg font-medium hover:text-gray-300"
                  >
                    Your Portfolios
                  </Link>
                )}
                <span className="text-gray-300">Hi, {user?.name}!</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-lg font-medium hover:text-gray-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-theme-yellow text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* --- 2. Hamburger Menu Button (Sirf mobile par dikhega) --- */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              {/* Icon (3 lines ya 'X') */}
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* --- 3. Mobile Menu Links (Jo neeche khulenge) --- */}
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            {/* Yahan humne saare links ko vertical stack kiya hai */}
            <div className="flex flex-col space-y-4">
              <Link
                to="/gallery"
                className="block text-lg font-medium hover:text-gray-300"
                onClick={closeMenu}
              >
                Public Gallery
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/"
                    className="block text-lg font-medium hover:text-gray-300"
                    onClick={closeMenu}
                  >
                    Create New
                  </Link>

                  {!isUserPortfolioPage && (
                    <Link
                      to="/professionals"
                      className="block text-lg font-medium hover:text-gray-300"
                      onClick={closeMenu}
                    >
                      Your Portfolios
                    </Link>
                  )}
                  <span className="text-gray-300 py-2">Hi, {user?.name}!</span>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block text-lg font-medium hover:text-gray-300"
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="w-full text-center bg-theme-yellow text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
                    onClick={closeMenu}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
