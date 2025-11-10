// src/pages/PreviewPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { mockData as originalMockData } from '../data/mockData'; 

// Templates import karein
import Template1 from '../components/templates/Template1';
import Template2 from '../components/templates/Template2';
import Template3 from '../components/templates/Template3'; 
import Template4 from '../components/templates/Template4'; // <-- Naya import

const PreviewPage = () => {
  const { id } = useParams(); 
  let modifiedMockData = JSON.parse(JSON.stringify(originalMockData)); 

  // Image overwrite logic
  if (id === '1') modifiedMockData.hero.profileImage = "/template1.png"; 
  else if (id === '2') modifiedMockData.hero.profileImage = "/template2.png";
  else if (id === '3') modifiedMockData.hero.profileImage = "/template1.png"; 
  else if (id === '4') modifiedMockData.hero.profileImage = "/template2.png"; // Placeholder

  // Render logic ko update karein
  switch (String(id)) {
    case '1':
      return <Template1 data={modifiedMockData} />; 
    case '2':
      return <Template2 data={modifiedMockData} />; 
    case '3':
      return <Template3 data={modifiedMockData} />;
    // --- NAYA CASE 4 ---
    case '4':
      return <Template4 data={modifiedMockData} />;
    // -------------------
    default:
      return <div className="text-center p-10">Preview not found.</div>;
  }
};

export default PreviewPage;