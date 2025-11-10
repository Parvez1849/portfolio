// src/components/templates/common/Footer.jsx
import React from 'react';

const Footer = ({ basicData, socialsData, theme = "default" }) => {
  const year = new Date().getFullYear();

  // --- Theme Logic ---
  let bgColor = "bg-gray-900"; // Default
  if (theme === "dark") {
    bgColor = "bg-black";
  } else if (theme === "corporate") {
    bgColor = "bg-blue-800";
  } else if (theme === "minimal") {
    bgColor = "bg-white";
  }
  // --- End Theme Logic ---
  
  const textColor = theme === "minimal" ? "text-gray-600" : "text-gray-400";
  const linkColor = theme === "minimal" ? "hover:text-black" : "hover:text-white";

  return (
    <footer className={`${bgColor} ${textColor} py-8 transition-colors duration-300`}>
      <div className="container mx-auto px-6 text-center">
        {socialsData && (
          <div className="flex justify-center space-x-6 mb-4">
            {socialsData.linkedin && <a href={socialsData.linkedin} target="_blank" rel="noreferrer" className={linkColor}>LinkedIn</a>}
            {socialsData.github && <a href={socialsData.github} target="_blank" rel="noreferrer" className={linkColor}>GitHub</a>}
            {socialsData.twitter && <a href={socialsData.twitter} target="_blank" rel="noreferrer" className={linkColor}>Twitter</a>}
          </div>
        )}
        <p>&copy; {year} {basicData?.name || 'Your Name'}. All rights reserved.</p>
        <p className="text-sm mt-1">
          Powered by React & TailwindCSS
        </p>
      </div>
    </footer>
  );
};

export default Footer;