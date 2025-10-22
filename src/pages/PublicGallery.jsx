// src/pages/PublicGallery.jsx
import React, { useState, useEffect } from 'react';
import { getAllPublicPortfoliosApi } from '../api/portfolioApi'; // Use the public API function
import ProfileCard from '../components/ProfileCard';

const PublicGallery = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPublicPortfolios = async () => {
      try {
        setLoading(true);
        const response = await getAllPublicPortfoliosApi(); // Call the public endpoint
        setPortfolios(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch public portfolios.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPublicPortfolios();
  }, []); // Fetch only once on mount

  // Filtering logic
  const filteredPortfolios = Array.isArray(portfolios)
    ? portfolios.filter((profile) =>
        (profile.hero?.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (profile.hero?.title?.toLowerCase() || '').includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="bg-gray-100 min-h-screen pb-10">
      <div className="bg-theme-yellow p-12 text-center shadow-md">
        <h1 className="text-4xl font-bold text-gray-800">Public Portfolio Gallery</h1>
        <p className="text-lg text-gray-700 mt-2">
          Browse portfolios created by our users.
        </p>
      </div>

      {/* Search Bar */}
      <div className="container mx-auto p-4 bg-white shadow-lg my-8 rounded-lg">
        <input
           type="text"
           placeholder="Search professionals..."
           className="w-full p-3 border border-gray-300 rounded-lg"
           onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Portfolio Grid */}
      <div className="container mx-auto p-4">
        {loading && <div className="text-center text-xl">Loading...</div>}
        {!loading && error && <div className="text-center text-xl text-red-500">{error}</div>}
        {!loading && !error && (
          portfolios.length === 0 ? (
            <div className="text-center p-10 text-gray-600">No public portfolios found yet.</div>
          ) : (
            // Use the same grid layout as ProfessionalsList
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredPortfolios.map((profile) => (
                <ProfileCard
                  key={profile._id}
                  profile={profile}
                  // Pass false to hide Edit/Delete buttons
                  showActions={false} 
                />
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default PublicGallery;