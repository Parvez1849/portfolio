// src/pages/PreviewPage.jsx

import React from 'react';
import { useParams } from 'react-router-dom';
import { mockData as originalMockData } from '../data/mockData'; // Import original mock data

// Import template components
import Template1 from '../components/templates/Template1';
import Template2 from '../components/templates/Template2';

const PreviewPage = () => {
  const { id } = useParams(); // Get template ID (1 or 2) from URL

  // --- Create a copy of mock data to modify ---
  let modifiedMockData = JSON.parse(JSON.stringify(originalMockData)); 

  // --- Overwrite images based on template ID ---
  if (id === '1') {
    // Use the image from the public folder for Template 1
    modifiedMockData.hero.profileImage = "/template1.png"; 
    // Optionally change project images too if needed
    if (modifiedMockData.projects && modifiedMockData.projects[0]) {
      modifiedMockData.projects[0].image = "/template1.png"; 
    }
  } else if (id === '2') {
    // Use the image from the public folder for Template 2
    modifiedMockData.hero.profileImage = "/template2.png";
    // Optionally change project images too if needed
     if (modifiedMockData.projects && modifiedMockData.projects[0]) {
      modifiedMockData.projects[0].image = "/template2.png";
    }
  }
  // --- End image overwriting ---

  // Choose which template component to render with the modified data
  switch (String(id)) {
    case '1':
      return <Template1 data={modifiedMockData} />; 
      
    case '2':
      return <Template2 data={modifiedMockData} />; 
      
    default:
      return <div className="text-center p-10">Preview not found.</div>;
  }
};

export default PreviewPage;