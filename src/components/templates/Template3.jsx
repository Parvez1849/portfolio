// src/components/templates/Template3.jsx
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

// Yeh Template 3 (Corporate Theme) hai
const Template3 = ({ data }) => {
  if (!data) {
    return <div className="text-center p-10">Loading template data...</div>;
  }

  // --- Naya Theme Yahaan Define Karein ---
  const theme = "corporate";
  // ------------------------------------

  // Sections ko fade-in karne ke liye animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    // Is template ka default background light grey hai
    <div className="font-sans antialiased bg-gray-50 text-gray-800">
      
      {/* HeroSection ko 'corporate' theme pass karein */}
      <HeroSection heroData={data.hero} aboutData={data.about} theme={theme} />

      <main className="container mx-auto p-8">
        
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

export default Template3;