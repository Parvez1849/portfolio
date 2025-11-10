// src/components/templates/common/ServicesSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import ReadMore from '../../ReadMore';

// ServiceCard component
const ServiceCard = ({ title, description, theme }) => {
  // --- Theme Logic ---
  let borderColor = "border-theme-red"; // Default
  if (theme === "dark") borderColor = "border-theme-yellow";
  if (theme === "corporate") borderColor = "border-blue-600";
  if (theme === "minimal") borderColor = "border-gray-800";
  // --- End Theme Logic ---

  return (
    <div className={`bg-white p-6 rounded-lg shadow-lg border-t-4 ${borderColor} transition-all duration-300 hover:shadow-xl h-full`}>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <ReadMore text={description} maxLength={100} />
    </div>
  );
};

// Main ServicesSection component
const ServicesSection = ({ servicesData, theme = "default" }) => {
  if (!servicesData || servicesData.length === 0) return null;

  // --- Theme Logic ---
  let headingColor = "text-theme-red";
  if (theme === "dark") headingColor = "text-theme-yellow";
  if (theme === "corporate") headingColor = "text-blue-600";
  if (theme === "minimal") headingColor = "text-gray-900";
  // --- End Style Logic ---

  const pColor = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const bgColor = theme === "dark" ? "bg-gray-800" : "bg-gray-50";
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2 // Har card 0.2s ke delay se aayega
      }
    }
  };
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <section className={`my-12 py-12 ${bgColor} transition-colors duration-300`}>
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">
          My <span className={headingColor}>Services</span>
        </h2>
        <p className={`text-center ${pColor} mb-10`}>
          Offering a wide range of professional services.
        </p>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} // 20% dikhne par animate ho
        >
          {servicesData.map((service) => (
            <motion.div
              key={service._id || service.title}
              variants={itemVariants}
              className="h-full"
            >
              <ServiceCard 
                title={service.title} 
                description={service.description} 
                theme={theme}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;