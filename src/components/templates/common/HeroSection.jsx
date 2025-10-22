// src/components/templates/common/HeroSection.jsx
import React from 'react';

const HeroSection = ({ heroData, aboutData }) => {
  // Add console logs for debugging
  console.log("HeroSection received heroData:", heroData);
  console.log("HeroSection received aboutData:", aboutData);

  // Add extra checks for safety
  if (!heroData) {
      console.error("HeroSection missing heroData!");
      return null; // Don't render if heroData is missing
  }

  // Destructure AFTER checking if heroData exists
  const { name, title, tagline, profileImage } = heroData;
  const resumeUrl = aboutData?.resumeUrl; // Optional chaining for safety

  // --- USE A DIFFERENT, RELIABLE PLACEHOLDER ---
  const validProfileImage = profileImage || 'https://placehold.co/400x400?text=No+Image';
  // -------------------------------------------

  return (
    <section className="bg-theme-yellow text-gray-800">
      <div className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center">
        {/* Left Side (Text) */}
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h2 className="text-2xl font-semibold">{title || 'Your Title'}</h2> {/* Added fallback */}
          <h1 className="text-5xl md:text-6xl font-bold my-3">{name || 'Your Name'}</h1> {/* Added fallback */}
          <p className="text-lg text-gray-700">{tagline || 'Your catchy tagline'}</p> {/* Added fallback */}
          <div className="mt-8 space-x-4">
            <a
              href="#contact"
              className="bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-black transition-colors"
            >
              Contact Me
            </a>
            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                // download attribute removed
                className="bg-white text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors border border-gray-300"
              >
                View CV
              </a>
            )}
          </div>
        </div>

        {/* Right Side (Image) */}
        <div className="md:w-1/2 flex justify-center">
          <img
            // Use the updated placeholder
            src={validProfileImage}
            alt={name || 'Profile'}
            className="w-64 h-64 md:w-96 md:h-96 rounded-full object-cover border-8 border-white shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;