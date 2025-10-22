import React from 'react';

// This is the individual service card
const ServiceCard = ({ title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-theme-red transition-all duration-300 hover:shadow-xl">
    {/* You can add an icon here */}
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

// This is the main section component
const ServicesSection = ({ servicesData }) => {
  if (!servicesData || servicesData.length === 0) return null;

  return (
    <section className="my-12 py-12 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">
          My <span className="text-theme-red">Services</span>
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Offering a wide range of professional services.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <ServiceCard 
              key={service.id || service.title} 
              title={service.title} 
              description={service.description} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;