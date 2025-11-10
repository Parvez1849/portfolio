// src/components/templates/common/ContactSection.jsx
import React from 'react';

const ContactSection = ({ contactData, theme = "default" }) => {
  if (!contactData) return null;

  const { message, email, phone } = contactData;

  // --- Theme Logic ---
  let bgColor = "bg-gray-800"; // Default
  let headingColor = "text-theme-red";
  let linkColor = "hover:text-theme-red";

  if (theme === "dark") {
    bgColor = "bg-black";
    headingColor = "text-theme-yellow";
    linkColor = "hover:text-theme-yellow";
  } else if (theme === "corporate") {
    bgColor = "bg-blue-700";
    headingColor = "text-white"; 
    linkColor = "hover:text-blue-300";
  } else if (theme === "minimal") {
    bgColor = "bg-gray-100";
    headingColor = "text-black";
    linkColor = "hover:text-gray-600";
  }
  // --- End Theme Logic ---
  
  const pColor = theme === "minimal" ? "text-gray-700" : "text-gray-300";
  const mainTextColor = theme === "minimal" ? "text-gray-900" : "text-white";

  return (
    <section id="contact" className={`my-12 py-16 ${bgColor} ${mainTextColor} transition-colors duration-300`}>
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Get In <span className={headingColor}>Touch</span>
        </h2>
        <p className={`${pColor} text-lg max-w-2xl mx-auto mb-8`}>
          {message}
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
          <div className="text-xl">
            <strong>Email:</strong> <a href={`mailto:${email}`} className={`${linkColor} transition-colors`}>{email}</a>
          </div>
          <div className="text-xl">
            <strong>Phone:</strong> <a href={`tel:${phone}`} className={`${linkColor} transition-colors`}>{phone}</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;