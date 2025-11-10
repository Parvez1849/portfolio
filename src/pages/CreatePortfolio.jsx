// src/pages/CreatePortfolio.jsx

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { createPortfolio } from '../api/portfolioApi';

// --- Import all your form steps ---
import BasicDetailsStep from '../components/form/BasicDetailsStep';
import HeroStep from '../components/form/HeroStep';
import AboutStep from '../components/form/AboutStep';
import SkillsStep from '../components/form/SkillsStep'; // <-- YAHAN IMPORT KAREIN
import ServicesStep from '../components/form/ServicesStep';
import ProjectsStep from '../components/form/ProjectsStep';
import TestimonialsStep from '../components/form/TestimonialsStep';
import ContactStep from '../components/form/ContactStep';

const steps = [
  'Basic Details', 'Header & Hero', 'About Section', 
  'Skills', // <-- YAHAN ADD KAREIN
  'Services', 'Products', 'Clients & Testimonials', 'Contact', 'Footer'
];

const CreatePortfolio = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(steps[0]);

  const templateId = location.state?.templateId || 1; 

  const methods = useForm({
    defaultValues: {
      basic: { companyName: '', name: '', email: '', phone: '' },
      hero: { name: '', title: '', tagline: '', profileImage: '' },
      about: { bio: '', location: '', socials: {} },
      skills: [],
      services: [],
      projects: [],
      testimonials: [],
      blog: [],
      contact: { message: '', email: '', phone: '' }
    }
  });

  const onSubmit = async (data) => {
    const finalData = { ...data, templateId: templateId };

    console.log("Submitting Create Data:", JSON.stringify(finalData, null, 2));
    console.log("Submitting:", finalData);
    
    try {
      await createPortfolio(finalData);
      alert('Portfolio Created Successfully!');
      navigate('/professionals');
    } catch (error) {
      console.error('Failed to create portfolio', error);
      alert('Error: Could not create portfolio.');
    }
  };

  const renderStep = () => {
    switch (activeStep) {
      case 'Basic Details':
        return <BasicDetailsStep />;
      case 'Header & Hero':
        return <HeroStep />;
      case 'About Section':
        return <AboutStep />;
      case 'Skills': // <-- YAHAN CASE ADD KAREIN
        return <SkillsStep />;
      case 'Services':
        return <ServicesStep />;
      case 'Products':
        return <ProjectsStep />;
      case 'Clients & Testimonials':
        return <TestimonialsStep />;
      case 'Contact':
        return <ContactStep />;
      default:
        return <BasicDetailsStep />;
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-8">
        <div className="border bg-white shadow-md rounded-lg">
          {/* Tab Navigation */}
          <div className="flex border-b overflow-x-auto">
            {steps.map((step) => (
              <button
                type="button"
                key={step}
                onClick={() => setActiveStep(step)}
                className={`py-3 px-6 text-sm font-medium whitespace-nowrap ${
                  activeStep === step 
                    ? 'border-b-2 border-red-500 text-red-500' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {step}
              </button>
            ))}
          </div>

          {/* Form Content Area */}
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">{activeStep}</h2>
            {renderStep()}
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-green-700 transition-colors"
          >
            Create & Save Portfolio
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default CreatePortfolio;
