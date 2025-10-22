// src/components/templates/common/ContactSection.jsx
import React from 'react';

const ContactSection = ({ contactData }) => {
  if (!contactData) return null;

  const { message, email, phone } = contactData;

  return (
    // ID "contact" YAHAN ADD KI GAYI HAI
    <section id="contact" className="my-12 py-16 bg-gray-800 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Get In <span className="text-theme-red">Touch</span>
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
          {message}
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
          <div className="text-xl">
            <strong>Email:</strong> <a href={`mailto:${email}`} className="hover:text-theme-red transition-colors">{email}</a>
          </div>
          <div className="text-xl">
            <strong>Phone:</strong> <a href={`tel:${phone}`} className="hover:text-theme-red transition-colors">{phone}</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;