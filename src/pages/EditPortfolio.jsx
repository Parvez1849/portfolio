// src/pages/EditPortfolio.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { updatePortfolio, getPortfolioById } from '../api/portfolioApi'; 

// Import form steps (assuming they exist)
import BasicDetailsStep from '../components/form/BasicDetailsStep';
import HeroStep from '../components/form/HeroStep';
import AboutStep from '../components/form/AboutStep';
import SkillsStep from '../components/form/SkillsStep';
import ServicesStep from '../components/form/ServicesStep';
import ProjectsStep from '../components/form/ProjectsStep';
import TestimonialsStep from '../components/form/TestimonialsStep';
import ContactStep from '../components/form/ContactStep';

const steps = [
  'Basic Details', 'Header & Hero', 'About Section', 'Skills',
  'Services', 'Products', 'Clients & Testimonials', 'Contact'
];

const EditPortfolio = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(steps[0]);
  const [loading, setLoading] = useState(true);

  // Initialize useForm without defaultValues here
  const methods = useForm(); 

  // Fetch existing data when component mounts
  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setLoading(true);
        const response = await getPortfolioById(id);
        // Use reset to populate the form fields with fetched data
        methods.reset(response.data); 
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch portfolio data", error);
        alert("Could not load portfolio data to edit.");
        navigate('/professionals'); // Redirect if fetch fails
      }
    };
    fetchPortfolioData();
  }, [id, methods]); // Include methods in dependency array for reset

  // --- UPDATE SUBMIT LOGIC ---
  const onSubmit = async (data) => {
    // Create a deep copy of the data to modify
    let updatedData = JSON.parse(JSON.stringify(data));

    // --- **REMOVE NESTED _id FIELDS** ---
    // Function to recursively remove _id from nested objects (but not arrays)
    const removeNestedIds = (obj) => {
        for (const key in obj) {
            if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                delete obj[key]._id; // Delete _id if found
                removeNestedIds(obj[key]); // Recurse into nested object
            }
        }
    };
    removeNestedIds(updatedData);
    // Remove top-level fields added by MongoDB/Mongoose that shouldn't be sent back
    delete updatedData._id; 
    delete updatedData.userId; 
    delete updatedData.createdAt;
    delete updatedData.updatedAt;
    delete updatedData.__v;
    // --- **END REMOVAL** ---

    console.log("Submitting Cleaned Update Data:", JSON.stringify(updatedData, null, 2)); // Log cleaned data

    try {
      await updatePortfolio(id, updatedData); // Send cleaned data
      alert('Portfolio Updated Successfully!');
      navigate('/professionals'); 
    } catch (error) {
      console.error('Failed to update portfolio', error);
      alert('Error: Could not update portfolio.');
    }
  };
  // --- END UPDATE SUBMIT LOGIC ---

  const renderStep = () => {
    switch (activeStep) {
      case 'Basic Details': return <BasicDetailsStep />;
      case 'Header & Hero': return <HeroStep />;
      case 'About Section': return <AboutStep />;
      case 'Skills': return <SkillsStep />;
      case 'Services': return <ServicesStep />;
      case 'Products': return <ProjectsStep />;
      case 'Clients & Testimonials': return <TestimonialsStep />;
      case 'Contact': return <ContactStep />;
      default: return <BasicDetailsStep />;
    }
  };

  if (loading) {
    return <div className="text-center p-10">Loading data for editing...</div>;
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-8">
        <h2 className="text-3xl font-bold mb-4 text-center">Edit Your Portfolio</h2>
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

        {/* Submit Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-green-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default EditPortfolio;