// src/components/templates/common/PortfolioSection.jsx
import React from 'react';
import ReadMore from '../../ReadMore'; 
import { motion } from 'framer-motion';

// ProjectCard component
const ProjectCard = ({ title, description, image, link, githubLink, theme }) => {
  // --- Theme Logic ---
  let liveBtnClass = "bg-theme-red hover:bg-red-600"; // Default
  let codeBtnClass = "bg-gray-800 hover:bg-gray-900"; // Default

  if (theme === "dark") {
    liveBtnClass = "bg-theme-yellow text-black hover:bg-yellow-500";
    codeBtnClass = "bg-gray-700 hover:bg-gray-600";
  } else if (theme === "corporate") {
    liveBtnClass = "bg-blue-600 hover:bg-blue-700";
    codeBtnClass = "bg-gray-800 hover:bg-gray-900";
  } else if (theme === "minimal") {
    liveBtnClass = "bg-black hover:bg-gray-700";
    codeBtnClass = "bg-white text-black border border-gray-400 hover:bg-gray-100";
  }
  // --- End Theme Logic ---

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
      <img 
        src={image || 'https://placehold.co/400x300?text=Project+Image'} 
        alt={title} 
        className="w-full h-48 object-cover" 
      />
      <div className="p-6 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
          <ReadMore text={description} maxLength={100} />
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {link && (
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`inline-block text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${liveBtnClass}`}
            >
              View Live Project
            </a>
          )}
          {githubLink && (
            <a 
              href={githubLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`inline-block px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${codeBtnClass} ${theme === "minimal" ? "text-black" : "text-white"}`}
            >
              View Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Portfolio Section
const PortfolioSection = ({ projectData, theme = "default" }) => {
  if (!projectData || projectData.length === 0) return null;

  // --- Theme Logic ---
  let headingColor = "text-theme-red";
  if (theme === "dark") headingColor = "text-theme-yellow";
  if (theme === "corporate") headingColor = "text-blue-600";
  if (theme === "minimal") headingColor = "text-gray-900";
  // --- End Style Logic ---

  const pColor = theme === "dark" ? "text-gray-400" : "text-gray-600";
  
  // --- ** YAHAN THEEK KIYA GAYA HAI ** ---
  // 'const' ko 'let' se replace kiya gaya
  let bgColor = theme === "dark" ? "bg-gray-800" : "bg-gray-50"; 
  if (theme === "minimal") bgColor = "bg-white"; // Ab yeh line kaam karegi
  // --- ** END FIX ** ---

  return (
    <section className={`my-12 py-12 ${bgColor} transition-colors duration-300`}>
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">
          Photo <span className={headingColor}>Gallery</span>
        </h2>
        <p className={`text-center ${pColor} mb-10`}>
          A collection of my recent projects and work.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectData.map((project, index) => (
            <motion.div
              key={project._id || project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <ProjectCard 
                {...project} // Pass all project props
                theme={theme} // Pass theme
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;