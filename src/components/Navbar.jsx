// src/components/Navbar.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { authState, logout } = useAuth();
  const { isAuthenticated, user } = authState;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isUserPortfolioPage = location.pathname === '/professionals';

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-theme-yellow">
          Portfolio Generator
        </Link>

        <div className="space-x-6 flex items-center">
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
              {/* Show "Create New" whenever logged in */}
              <Link to="/" className="text-lg font-medium hover:text-gray-300">
                Create New
              </Link>
              
              {/* Show "Your Portfolios" only if NOT already on that page */}
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
              {/* Show Login/Register if not logged in */}
              <Link to="/login" className="text-lg font-medium hover:text-gray-300">
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
      </div>
    </nav>
  );
};

export default Navbar;