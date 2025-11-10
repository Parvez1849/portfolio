// src/pages/SelectTemplate.jsx
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

const TemplateCard = ({ img, title, description, features, onSelect, previewUrl }) => (
  <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
    <img src={img} alt={title} className="w-full h-48 object-cover" />
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <h3 className="font-semibold mb-2">Key Features:</h3>
      <ul className="list-disc list-inside text-sm text-gray-500 space-y-1 mb-6">
        {features.map((feat) => <li key={feat}>{feat}</li>)}
      </ul>
      <div className="flex justify-between items-center">
        <button
          onClick={onSelect} 
          // Customize button (Red)
          className="rounded-lg bg-theme-red px-4 py-2 text-white font-semibold shadow-md hover:bg-red-600 transition-colors"
        >
          Customize This Template
        </button>
        
        {/* --- YAHAN CHANGE KIYA GAYA HAI --- */}
        <Link 
          to={previewUrl} 
          // Preview button (Dark Black)
          // "hover:bg-gray-700" aur "transition-colors" add kiya gaya hai
          className="bg-gray-900 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-700 transition-colors"
        >
          Preview
        </Link>
        {/* ------------------------------- */}
      </div>
    </div>
  </div>
);

const SelectTemplate = () => {
  const navigate = useNavigate();
  const { authState } = useAuth(); 
  const { isAuthenticated } = authState;

  const handleSelect = (templateId) => {
    if (isAuthenticated) {
      navigate('/create-portfolio', { state: { templateId: templateId } });
    } else {
      navigate('/auth', { state: { from: '/', templateId: templateId } }); 
    }
  };

  // Template list
  const templates = [
    {
      id: 1,
      img: "/template1.png",
      title: "Template 1 (Default)",
      description: "Modern and clean design with red highlights.",
      features: ["Hero Section", "Grid Portfolio", "Red Theme"],
      previewUrl: "/preview/1"
    },
    {
      id: 2,
      img: "/template2.png",
      title: "Template 2 (Dark Mode)",
      description: "A dark theme with yellow highlights.",
      features: ["Dark Mode", "Yellow Theme", "Animated Sections"],
      previewUrl: "/preview/2"
    },
    {
      id: 3,
      img: "/template1.png", 
      title: "Template 3 (Corporate)",
      description: "A professional blue theme with clean animations.",
      features: ["Corporate Blue Theme", "Skills First", "Animated Sections"],
      previewUrl: "/preview/3"
    },
    {
      id: 4,
      img: "/template2.png", 
      title: "Template 4 (Minimalist)",
      description: "A clean, black & white, serif-font theme.",
      features: ["Serif Fonts", "Black/White", "Staggered Animation"],
      previewUrl: "/preview/4"
    }
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-3">
        Choose Your <span className="text-theme-red">Template</span>
      </h1>
      <p className="text-gray-500 mb-10">
        Select a professional template that best represents your style.
      </p>
      <div className="flex flex-wrap justify-center gap-10">
        {templates.map(template => (
          <TemplateCard
            key={template.id}
            {...template}
            onSelect={() => handleSelect(template.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectTemplate;