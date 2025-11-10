// src/components/templates/common/HeroSection.jsx
import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = ({ heroData, aboutData, theme = "default" }) => { 
  if (!heroData) return null;

  const { name, title, tagline, profileImage } = heroData;
  const resumeUrl = aboutData?.resumeUrl;

  // --- Theme Logic ---
  let bgColor = "bg-theme-yellow"; // Default (Template 1)
  let textColor = "text-gray-800";
  let btnClass = "bg-gray-800 text-white hover:bg-black";
  let btnAltClass = "bg-white text-gray-800";

  if (theme === "dark") { // Template 2
    bgColor = "bg-gray-900";
    textColor = "text-white";
    btnClass = "bg-theme-yellow text-black hover:bg-yellow-500";
    btnAltClass = "bg-gray-700 text-white";
  } else if (theme === "corporate") { // Template 3
    bgColor = "bg-blue-700";
    textColor = "text-white";
    btnClass = "bg-white text-blue-700 hover:bg-gray-100";
    btnAltClass = "bg-blue-600 text-white";
  } else if (theme === "minimal") { // Template 4
    bgColor = "bg-white";
    textColor = "text-gray-900";
    btnClass = "bg-black text-white hover:bg-gray-700";
    btnAltClass = "bg-white text-black border border-gray-400";
  }
  // --- End Theme Logic ---

  const validProfileImage = profileImage || 'https://placehold.co/400x400?text=No+Image';

  return (
    <section className={`${bgColor} ${textColor} transition-colors duration-300 relative overflow-hidden`}>
      <div className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center relative z-10">
        
        <motion.div 
          className="md:w-1/2 text-center md:text-left mb-8 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-semibold">{title || 'Your Title'}</h2>
          <h1 className="text-5xl md:text-6xl font-bold my-3">{name || 'Your Name'}</h1>
          <p className="text-lg opacity-90">{tagline || 'Your catchy tagline'}</p>
          <div className="mt-8 space-x-4">
            <a
              href="#contact"
              className={`${btnClass} px-6 py-3 rounded-lg font-semibold transition-colors`}
            >
              Contact Me
            </a>
            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${btnAltClass} px-6 py-3 rounded-lg font-semibold transition-colors border border-transparent`}
              >
                View CV
              </a>
            )}
          </div>
        </motion.div>

        <motion.div 
          className="md:w-1/2 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img
            src={validProfileImage}
            alt={name || 'Profile'}
            className="w-64 h-64 md:w-96 md:h-96 rounded-full object-cover border-8 border-white shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;