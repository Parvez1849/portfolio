// src/components/templates/Template4.jsx
import React from 'react';
import { motion } from 'framer-motion';

// Sabhi common sections ko import karein
import HeroSection from './common/HeroSection';
import AboutSection from './common/AboutSection';
import SkillsSection from './common/SkillsSection';
import ServicesSection from './common/ServicesSection';
import PortfolioSection from './common/PortfolioSection';
import TestimonialsSection from './common/TestimonialsSection';
import ContactSection from './common/ContactSection';
import Footer from './common/Footer';

// Yeh Template 4 hai (Minimalist Theme)
const Template4 = ({ data }) => {
  if (!data) {
    return <div className="text-center p-10">Loading template data...</div>;
  }

  // --- Naya Theme Yahaan Define Karein ---
  const theme = "minimal";
  // ------------------------------------

  // Sections ko fade-in karne ke liye animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  return (
    // Is template ka default background white hai, font serif hai
    <div className="font-serif antialiased bg-white text-gray-900">
      
      {/* HeroSection ko 'minimal' theme pass karein */}
      <HeroSection heroData={data.hero} aboutData={data.about} theme={theme} />

      <main className="container mx-auto p-8 max-w-4xl">
        
        {/* Har section ko 'motion.div' se wrap karein taaki woh animate ho sake */}
        
        {data.about && (
          <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <AboutSection aboutData={data.about} theme={theme} />
          </motion.div>
        )}
        
        {data.skills && data.skills.length > 0 && (
          <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <SkillsSection skillsData={data.skills} theme={theme} />
          </motion.div>
        )}

        {data.services && data.services.length > 0 && (
          <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <ServicesSection servicesData={data.services} theme={theme} />
          </motion.div>
        )}

        {data.projects && data.projects.length > 0 && (
          <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <PortfolioSection projectData={data.projects} theme={theme} />
          </motion.div>
        )}

        {data.testimonials && data.testimonials.length > 0 && (
          <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <TestimonialsSection testimonialData={data.testimonials} theme={theme} />
          </motion.div>
        )}

        {data.contact && (
          <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <ContactSection contactData={data.contact} theme={theme} />
          </motion.div>
        )}
      </main>

      <Footer 
        basicData={data.basic} 
        socialsData={data.about?.socials} 
        theme={theme}
      />
    </div>
  );
};

export default Template4;