// src/components/templates/common/SkillsSection.jsx
import React from 'react';
import { motion } from 'framer-motion'; 

// SkillBar component
const SkillBar = ({ name, level, theme }) => {
  // --- Style Logic ---
  let barColor = "bg-red-600"; // Default (Template 1)
  if (theme === "dark") {
    barColor = "bg-theme-yellow"; // Dark theme (Template 2)
  } else if (theme === "corporate") {
    barColor = "bg-blue-600"; // Corporate theme (Template 3)
  } else if (theme === "minimal") {
    barColor = "bg-gray-800"; // Minimal theme (Template 4)
  }
  // --- End Style Logic ---

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-gray-700">{name}</span>
        <span className="text-sm font-medium text-gray-700">{level}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`${barColor} h-2.5 rounded-full`} 
          style={{ width: `${level}%` }}
        ></div>
      </div>
    </div>
  );
};

// Main SkillsSection component
const SkillsSection = ({ skillsData, theme = "default" }) => { 
  if (!skillsData || skillsData.length === 0) return null;

  // --- Style Logic for Section ---
  let headingColor = "text-theme-red";
  if (theme === "dark") headingColor = "text-theme-yellow";
  if (theme === "corporate") headingColor = "text-blue-600";
  if (theme === "minimal") headingColor = "text-gray-900";
  // --- End Style Logic ---
  
  const pColor = theme === "dark" ? "text-gray-400" : "text-gray-600";
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1 // Har skill bar 0.1s ke delay se aayega
      }
    }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="my-12 py-12">
      <h2 className="text-4xl font-bold text-center mb-4">
        My <span className={headingColor}>Skills</span>
      </h2>
      <p className={`text-center ${pColor} mb-10`}>
        Here is a breakdown of my professional skills.
      </p>
      
      <motion.div 
        className="grid md:grid-cols-3 gap-x-12 gap-y-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} // 30% dikhne par animate ho
      >
        {skillsData.map((skill) => (
          <motion.div
            key={skill._id || skill.name}
            variants={itemVariants} // Child animation
          >
            <SkillBar 
              name={skill.name} 
              level={skill.level}
              theme={theme} // Pass theme down to SkillBar
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default SkillsSection;