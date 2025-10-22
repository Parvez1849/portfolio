// src/components/templates/Template1.jsx
import React from 'react';

// Import all the common section components
import HeroSection from './common/HeroSection';
import AboutSection from './common/AboutSection';
import SkillsSection from './common/SkillsSection';
import ServicesSection from './common/ServicesSection';
import PortfolioSection from './common/PortfolioSection';
import TestimonialsSection from './common/TestimonialsSection';
import ContactSection from './common/ContactSection';
import Footer from './common/Footer';

const Template1 = ({ data }) => {
  // Log the received data
  console.log("Data received by Template1:", data);

  // Show loading or error if data is missing
  if (!data) {
     return <div className="text-center p-10">Loading template data...</div>;
  }

  // --- Render the template structure ---
  return (
    <div className="font-sans antialiased">
      {/* Pass the correct data slices to each section component */}
      
      <HeroSection heroData={data.hero} aboutData={data.about} />

      <main>
        {/* Only render sections if their corresponding data exists */}
        
        {data.about && <AboutSection aboutData={data.about} />}

        {data.skills && data.skills.length > 0 && (
          <SkillsSection skillsData={data.skills} />
        )}

        {data.services && data.services.length > 0 && (
          <ServicesSection servicesData={data.services} />
        )}

        {data.projects && data.projects.length > 0 && (
          <PortfolioSection projectData={data.projects} />
        )}

        {data.testimonials && data.testimonials.length > 0 && (
          <TestimonialsSection testimonialData={data.testimonials} />
        )}

        {data.contact && <ContactSection contactData={data.contact} />}
      </main>

      {/* Pass necessary data to the Footer */}
      <Footer
        basicData={data.basic}
        socialsData={data.about?.socials}
      />
    </div>
  );
};

export default Template1;

