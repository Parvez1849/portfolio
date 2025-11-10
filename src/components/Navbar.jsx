// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiMenu } from "react-icons/hi"; // Hamburger icon
import { IoClose } from "react-icons/io5"; // Close icon

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { authState, logout } = useAuth();
  const { isAuthenticated, user, loading } = authState;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setIsMobileMenuOpen(false); 
    navigate('/auth'); // Redirect to login page after logout
  };

  const isUserPortfolioPage = location.pathname === '/professionals';

  const handleMobileLinkClick = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* === Logo === */}
        <Link to="/" className="text-2xl font-bold hover:text-theme-yellow" onClick={() => setIsMobileMenuOpen(false)}>
          Portfolio Generator
        </Link>

        {/* === Desktop Menu === */}
        {!loading && (
          <div className="hidden md:flex space-x-6 items-center">
            <Link
              to="/gallery"
              className="text-lg font-medium hover:text-gray-300"
            >
              Public Gallery
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/" className="text-lg font-medium hover:text-gray-300">
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
                {/* --- **FIXED LINK HERE** --- */}
                <Link
                  to="/auth" // Ensure this path is /auth
                  className="bg-theme-yellow text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
                >
                  Login / Register
                </Link>
              </>
            )}
          </div>
        )}

        {/* === Mobile Menu Button === */}
        {!loading && (
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
              {isMobileMenuOpen ? <IoClose size={30} /> : <HiMenu size={30} />}
            </button>
          </div>
        )}

      </div>

      {/* === Mobile Menu Dropdown === */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-gray-800 shadow-lg py-4">
          <div className="container mx-auto flex flex-col space-y-4 px-4">
            
            <Link
              to="/gallery"
              className="text-lg font-medium hover:text-gray-300"
              onClick={() => handleMobileLinkClick('/gallery')}
            >
              Public Gallery
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/" className="text-lg font-medium hover:text-gray-300" onClick={() => handleMobileLinkClick('/')}>
                  Create New
                </Link>
                
                {!isUserPortfolioPage && (
                  <Link
                    to="/professionals" 
                    className="text-lg font-medium hover:text-gray-300"
                    onClick={() => handleMobileLinkClick('/professionals')}
                  >
                    Your Portfolios
                  </Link>
                )}
                <span className="text-gray-300">Hi, {user?.name}!</span> 
                <button
                  onClick={handleLogout} 
                  className="w-full text-left bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* --- **FIXED LINK HERE** --- */}
                <Link
                  to="/auth" // Ensure this path is /auth
                  className="w-full text-center bg-theme-yellow text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
                  onClick={() => handleMobileLinkClick('/auth')}
                >
                  Login / Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;