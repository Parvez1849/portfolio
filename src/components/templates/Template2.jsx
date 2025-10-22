// src/components/templates/Template2.jsx

import React from 'react';
import HeroSection from './common/HeroSection';
import AboutSection from './common/AboutSection';
import SkillsSection from './common/SkillsSection';
import ServicesSection from './common/ServicesSection';
import PortfolioSection from './common/PortfolioSection';
import TestimonialsSection from './common/TestimonialsSection';
import ContactSection from './common/ContactSection';
import Footer from './common/Footer';

const Template2 = ({ data }) => {

  console.log("Data received by Template1:", data);
  if (!data) {
    return <div className="text-center p-10">Loading template data...</div>;
  }

  // Note: Is template mein HeroSection.jsx ko dobara use kiya gaya hai.
  // Humne HeroSection.jsx ko pehle hi update kar diya hai,
  // isliye yahaan koi alag se change ki zaroorat nahi hai.
  // Yeh file bas import karti hai.

  return (
    <div className="font-sans antialiased bg-gray-900 text-white">
      
      <HeroSection heroData={data.hero} aboutData={data.about} />

      <main>
        {data.about && <AboutSection aboutData={data.about} />}
        
        {data.skills && data.skills.length > 0 && (
          <div className="bg-gray-800">
            <SkillsSection skillsData={data.skills} />
          </div>
        )}

        {data.services && data.services.length > 0 && (
          <ServicesSection servicesData={data.services} />
        )}

        {data.projects && data.projects.length > 0 && (
          <div className="bg-gray-800">
            <PortfolioSection projectData={data.projects} />
          </div>
        )}

        {data.testimonials && data.testimonials.length > 0 && (
          <TestimonialsSection testimonialData={data.testimonials} />
        )}

        {data.contact && <ContactSection contactData={data.contact} />}
      </main>

      <Footer 
        basicData={data.basic} 
        socialsData={data.about?.socials} 
      />
    </div>
  );
};

export default Template2;
