// src/components/templates/common/AboutSection.jsx
import React from 'react';
import ReadMore from '../../ReadMore'; // Assume ReadMore.jsx exists
import { motion } from 'framer-motion';

const AboutSection = ({ aboutData, theme = "default" }) => {
  if (!aboutData) return null;
  
  const { bio, location, email, phone, socials } = aboutData;

  // --- Theme Logic ---
  let headingColor = "text-theme-red";
  if (theme === "dark") headingColor = "text-theme-yellow";
  if (theme === "corporate") headingColor = "text-blue-700";
  if (theme === "minimal") headingColor = "text-gray-900";
  // --- End Theme Logic ---
  
  // Text color for dark theme
  const textColor = theme === "dark" ? "text-gray-300" : "text-gray-800";
  const pColor = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const strongColor = theme === "dark" ? "text-white" : "text-gray-900";

  return (
    <section className="my-12 py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">
          About <span className={headingColor}>Me</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
          <motion.div 
            className="md:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className={`text-2xl font-semibold ${textColor} mb-3`}>Biography</h3>
            {/* ReadMore component text color is handled internally or via its own props */}
            <ReadMore text={bio} maxLength={250} /> 
          </motion.div>
          
          <motion.div 
            className="md:col-span-1"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className={`text-2xl font-semibold ${textColor} mb-3`}>Personal Details</h3>
            <div className={`space-y-2 ${pColor}`}>
              {location && <p><strong className={strongColor}>Location:</strong> {location}</p>}
              {email && <p><strong className={strongColor}>Email:</strong> {email}</p>}
              {phone && <p><strong className={strongColor}>Phone:</strong> {phone}</p>}
            </div>
            
            {socials && (socials.linkedin || socials.github || socials.twitter) && (
              <div className="mt-6">
                <h4 className={`text-xl font-semibold ${textColor} mb-3`}>Socials</h4>
                <div className="flex space-x-4">
                  {socials.linkedin && <a href={socials.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">LinkedIn</a>}
                  {socials.github && <a href={socials.github} target="_blank" rel="noreferrer" className={`${textColor} hover:underline`}>GitHub</a>}
                  {socials.twitter && <a href={socials.twitter} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">Twitter</a>}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;