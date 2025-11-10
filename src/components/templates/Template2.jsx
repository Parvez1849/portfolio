// src/components/templates/Template2.jsx
import React from 'react';
import { motion } from 'framer-motion';

// Common sections
import HeroSection from './common/HeroSection';
import AboutSection from './common/AboutSection';
import SkillsSection from './common/SkillsSection';
import ServicesSection from './common/ServicesSection';
import PortfolioSection from './common/PortfolioSection';
import TestimonialsSection from './common/TestimonialsSection';
import ContactSection from './common/ContactSection';
import Footer from './common/Footer';

const Template2 = ({ data }) => {
  if (!data) return <div>Loading...</div>;

  const theme = "dark"; // Template 2 uses the dark theme

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="font-sans antialiased bg-gray-900 text-white">
      
      <HeroSection heroData={data.hero} aboutData={data.about} theme={theme} />

      <main className="container mx-auto p-8">
        {data.about && (
          <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <AboutSection aboutData={data.about} theme={theme} />
          </motion.div>
        )}
        {data.skills && data.skills.length > 0 && (
          <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="bg-gray-800 rounded-lg">
              <SkillsSection skillsData={data.skills} theme={theme} />
            </div>
          </motion.div>
        )}
        {data.services && data.services.length > 0 && (
          <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <ServicesSection servicesData={data.services} theme={theme} />
          </motion.div>
        )}
        {data.projects && data.projects.length > 0 && (
          <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="bg-gray-800 rounded-lg">
              <PortfolioSection projectData={data.projects} theme={theme} />
            </div>
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

export default Template2;
