// src/components/ProfileCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// Added 'showActions' prop, defaults to true
const ProfileCard = ({ profile, onDelete, showActions = true }) => {
  // --- ADD THIS LOG ---
  console.log("[ProfileCard] Received profile data:", profile);
  // --------------------

  // --- Use Optional Chaining for Safety ---
  // Agar 'profile' ya 'hero' missing ho toh error na aaye
  const _id = profile?._id;
  const hero = profile?.hero || {}; // Default to empty object if hero is missing
  const about = profile?.about || {}; // Default to empty object if about is missing
  const skills = profile?.skills || []; // Default to empty array if skills is missing

  // Destructure from the safe 'hero' and 'about' objects
  const { name = 'No Name Set', title = 'No Title Set', profileImage } = hero;
  const { bio = 'No bio available.' } = about;
  // --- End Safety Checks ---

  // Fallback placeholder image
  const validProfileImage = profileImage || 'https://placehold.co/100x100?text=No+Img'; 

  const handleDeleteClick = (e) => {
    e.preventDefault();
    if (onDelete && _id) { // Check if _id exists
      onDelete(_id);
    } else {
      console.error("[ProfileCard] Cannot delete, onDelete function or _id missing.");
    }
  };

  // If essential ID is missing, don't render the card
  if (!_id) {
     console.error("[ProfileCard] Cannot render card, _id is missing in profile data:", profile);
     return <div className="text-red-500 border p-4">Error: Invalid portfolio data.</div>; 
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <div className="bg-theme-yellow p-6">
        <img 
          src={validProfileImage} // Use the variable with placeholder
          alt={name} 
          className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-lg bg-gray-200" // Added bg-gray-200 for loading state
          // Optional: Add error handling for image load
          onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/100x100?text=Error'; }}
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-center text-gray-800">{name}</h3>
        <p className="text-sm text-theme-yellow-600 font-semibold text-center mb-3">{title}</p>
        <p className="text-gray-600 text-sm text-center mb-4">
          {bio.substring(0, 80)}{bio.length > 80 ? '...' : ''} {/* Ensure substring doesn't error */}
        </p>

        {/* Skills/Tags (Ensure skills is an array) */}
        <div className="flex flex-wrap gap-2 justify-center mb-5">
          {Array.isArray(skills) && skills.slice(0, 3).map((skill) => (
            <span 
              // Use skill name or index as key if id is missing
              key={skill._id || skill.name || Math.random()} 
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
            >
              {skill.name || 'Unnamed Skill'}
            </span>
          ))}
          {Array.isArray(skills) && skills.length > 3 && (
            <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
              +{skills.length - 3}
            </span>
          )}
        </div>

        {/* Button Container */}
        <div className="space-y-2 mt-4"> 
          <Link 
            to={`/portfolio/${_id}`} 
            className="block w-full text-center bg-gray-800 text-white py-2.5 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
          >
            View Portfolio
          </Link>

          {/* Conditionally Render Edit/Delete */}
          {showActions && (
            <>
              <Link 
                to={`/edit-portfolio/${_id}`} 
                className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
              >
                Edit
              </Link>
              <button
                onClick={handleDeleteClick}
                className="block w-full text-center bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors text-sm"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

