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
          className="rounded-lg bg-theme-red px-4 py-2 text-white font-semibold shadow-md hover:bg-red-600 transition-colors"
        >
          Customize This Template
        </button>
        <Link 
          to={previewUrl} 
          // target="_blank" // <-- THIS LINE IS REMOVED
          // rel="noopener noreferrer" // <-- THIS LINE IS REMOVED
          className="text-gray-600 font-semibold text-sm hover:text-black"
        >
          Preview
        </Link>
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
      navigate('/login', { state: { from: '/', templateId: templateId } });
    }
  };

  const templates = [
    {
      id: 1,
      img: "/template1.png",
      title: "Template 1",
      description: "Modern and clean design...",
      features: ["Hero Section", "Grid Portfolio", "Contact Form"],
      previewUrl: "/preview/1"
    },
    {
      id: 2,
      img: "/template2.png",
      title: "Template 2",
      description: "Split-screen layout...",
      features: ["Split Hero Layout", "Timeline Skills", "Blog Section"],
      previewUrl: "/preview/2"
    }
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-3">
        Choose Your <span className="text-theme-red">Template</span>
      </h1>
      <p className="text-gray-500 mb-10">
        Select a professional template...
      </p>
      <div className="flex flex-wrap justify-center gap-10">
        <TemplateCard
          {...templates[0]}
          onSelect={() => handleSelect(templates[0].id)}
        />
        <TemplateCard
          {...templates[1]}
          onSelect={() => handleSelect(templates[1].id)}
        />
      </div>
    </div>
  );
};

export default SelectTemplate;