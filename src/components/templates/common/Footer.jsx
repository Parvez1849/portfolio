import React from 'react';

const Footer = ({ basicData, socialsData }) => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="container mx-auto px-6 text-center">
        {socialsData && (
          <div className="flex justify-center space-x-6 mb-4">
            {socialsData.linkedin && <a href={socialsData.linkedin} target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a>}
            {socialsData.github && <a href={socialsData.github} target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a>}
            {socialsData.twitter && <a href={socialsData.twitter} target="_blank" rel="noreferrer" className="hover:text-white">Twitter</a>}
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