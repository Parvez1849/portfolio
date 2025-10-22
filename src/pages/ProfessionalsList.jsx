// src/pages/ProfessionalsList.jsx
import React, { useState, useEffect } from 'react';
import { getMyPortfolios, deletePortfolio } from '../api/portfolioApi';
import ProfileCard from '../components/ProfileCard';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const ProfessionalsList = () => {
  const [portfolios, setPortfolios] = useState([]); // Initialize as empty array
  const [isFetching, setIsFetching] = useState(false); // API fetch loading state
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { authState } = useAuth();
  const { isAuthenticated, loading: authLoading } = authState; // Auth loading state

  // --- ADD LOG 1 ---
  console.log("Component Render Start - Auth Loading:", authLoading, "Is Fetching:", isFetching);

  useEffect(() => {
    // --- ADD LOG 2 ---
    console.log("useEffect - Auth Loading:", authLoading, "Is Authenticated:", isAuthenticated);

    // If authentication is still loading, wait
    if (authLoading) {
      // --- ADD LOG 3 ---
      console.log("useEffect - Waiting for auth...");
      // Don't set isFetching here, rely on showLoading logic below
      return;
    }

    // If authentication is loaded and user is logged in, fetch data
    if (isAuthenticated) {
      // --- ADD LOG 4 ---
      console.log("useEffect - Auth ready, starting fetch...");
      const fetchPortfolios = async () => {
        setIsFetching(true); // Start API fetch
        setError(null);
        try {
          const response = await getMyPortfolios();
          // --- ADD LOG 5 ---
          console.log("useEffect - Fetch successful:", response.status);
          setPortfolios(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
          // --- ADD LOG 6 ---
          console.error("useEffect - Fetch failed:", err);
          setError('Failed to fetch your portfolios.');
          setPortfolios([]);
        } finally {
          // --- ADD LOG 7 ---
          console.log("useEffect - Fetch finished, setting isFetching false.");
          setIsFetching(false); // End API fetch
        }
      };
      fetchPortfolios();
    } else {
      // If authentication is loaded and user is NOT logged in
      // --- ADD LOG 8 ---
      console.log("useEffect - User not authenticated, setting isFetching false.");
      setIsFetching(false); // No fetch is happening
      setPortfolios([]);
      setError("Please log in to view your portfolios.");
    }
    // Dependency array: re-run effect when authentication status or loading changes
  }, [isAuthenticated, authLoading]);

  // Function to handle portfolio deletion
  const handleDeletePortfolio = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this portfolio?");
    if (isConfirmed) {
      try {
        await deletePortfolio(id);
        // Remove the deleted portfolio from the state
        setPortfolios(current => Array.isArray(current) ? current.filter(p => p._id !== id) : []);
        alert("Portfolio deleted successfully!");
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Error: Could not delete the portfolio.");
      }
    }
  };

  // Filtering logic (ensure portfolios is always an array)
  const filteredPortfolios = Array.isArray(portfolios)
    ? portfolios.filter((profile) =>
        (profile?.hero?.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (profile?.hero?.title?.toLowerCase() || '').includes(searchTerm.toLowerCase())
      )
    : [];

  // Determine overall loading state
  const showLoading = authLoading || isFetching;
  // --- ADD LOG 9 ---
  console.log("Render Check - Show Loading:", showLoading, "(Auth:", authLoading, "Fetch:", isFetching, ")");

  return (
    <div className="bg-gray-100 min-h-screen pb-10">
      {/* Header Section */}
      <div className="bg-theme-yellow p-12 text-center shadow-md">
        <h1 className="text-4xl font-bold text-gray-800">Your Portfolios</h1>
        <p className="text-lg text-gray-700 mt-2">
          Manage your created portfolios below.
        </p>
      </div>

      {/* --- Loading / Error / Search Display --- */}
      {/* Show Loading indicator if either auth or fetch is in progress */}
      {showLoading && <div className="text-center p-10 text-xl">Loading...</div>}

      {/* Show Login prompt only when not loading and user is not authenticated */}
      {!showLoading && !isAuthenticated && (
        <div className="text-center p-10 text-red-600 font-semibold">{error || "Please log in."}</div>
      )}

      {/* Show Fetch error only when not loading, user is authenticated, but there was an error */}
      {!showLoading && isAuthenticated && error && (
        <div className="text-center p-10 text-red-500 font-semibold">{error}</div>
      )}

      {/* Show Search Bar only when not loading, user is authenticated, and no error */}
      {!showLoading && isAuthenticated && !error && (
        <div className="container mx-auto p-4 bg-white shadow-lg my-8 rounded-lg">
          <input
            type="text"
            placeholder="Search your portfolios..."
            className="w-full p-3 border border-gray-300 rounded-lg"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      {/* --- Portfolio Grid or Empty Message --- */}
      <div className="container mx-auto p-4">
        {/* Show Grid/Empty message only when not loading, user is authenticated, and no error */}
        {!showLoading && isAuthenticated && !error && (
          filteredPortfolios.length === 0 ? (
            // Empty State
            <div className="text-center p-10">
              <p className="text-gray-600 mb-4">You haven't created any portfolios yet.</p>
              <Link to="/" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
                Create Your First Portfolio
              </Link>
            </div>
          ) : (
            // Portfolio Grid
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredPortfolios.map((profile) => (
                <ProfileCard
                  key={profile._id}
                  profile={profile}
                  onDelete={handleDeletePortfolio} // Pass delete handler
                  showActions={true} // Explicitly show actions for user's own list
                />
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ProfessionalsList;