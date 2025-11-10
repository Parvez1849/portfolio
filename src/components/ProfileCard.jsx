// src/components/ProfileCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // <-- 1. Framer Motion ko import karein

// 'onDelete' prop ko yahaan receive karein
const ProfileCard = ({ profile, onDelete, showActions = true }) => {
  const { _id, hero = {}, about = {}, skills = [] } = profile; 
  const { name = 'No Name Set', title = 'No Title Set', profileImage } = hero;
  const { bio = 'No bio available.' } = about;
  const validProfileImage = profileImage || 'https://placehold.co/100x100?text=No+Img'; 

  const handleDeleteClick = (e) => {
    e.preventDefault();
    if (onDelete && _id) { 
      onDelete(_id);
    } else {
      console.error("[ProfileCard] Cannot delete, onDelete function or _id missing.");
    }
  };

  if (!_id) {
     return <div className="text-red-500 border p-4">Error: Invalid portfolio data.</div>; 
  }

  // 2. <div> ko 'motion.div' se replace karein aur 'whileHover' prop add karein
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full"
      whileHover={{ scale: 1.03, y: -5 }} // Jab hover ho, toh 3% bada ho aur thoda upar uthe
      transition={{ type: "spring", stiffness: 300, damping: 15 }} // Springy animation
    >
      <div className="bg-theme-yellow p-6">
        <img 
          src={validProfileImage} 
          alt={name} 
          className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-lg bg-gray-200"
          onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/100x100?text=Error'; }}
        />
      </div>
      <div className="p-6 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-xl font-bold text-center text-gray-800">{name}</h3>
          <p className="text-sm text-theme-yellow-600 font-semibold text-center mb-3">{title}</p>
          <p className="text-gray-600 text-sm text-center mb-4">
            {bio.substring(0, 80)}{bio.length > 80 ? '...' : ''}
          </p>
          
          <div className="flex flex-wrap gap-2 justify-center mb-5">
            {Array.isArray(skills) && skills.slice(0, 3).map((skill) => (
              <span 
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
        </div>
        
        <div className="space-y-2 mt-4"> 
          <Link 
            to={`/portfolio/${_id}`} 
            className="block w-full text-center bg-gray-800 text-white py-2.5 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
          >
            View Portfolio
          </Link>

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
    </motion.div>
  );
};

export default ProfileCard;

