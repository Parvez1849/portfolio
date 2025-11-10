// src/components/templates/common/TestimonialsSection.jsx
import React from 'react';
import { motion } from 'framer-motion';

const TestimonialCard = ({ quote, author, theme }) => {
  // --- Theme Logic ---
  let authorColor = "text-theme-red"; // Default
  if (theme === "dark") authorColor = "text-theme-yellow";
  if (theme === "corporate") authorColor = "text-blue-600";
  if (theme === "minimal") authorColor = "text-gray-800";
  // --- End Theme Logic ---

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg text-center h-full">
      <p className="text-gray-600 italic text-lg mb-4">"{quote}"</p>
      <p className={`font-semibold ${authorColor}`}>- {author}</p>
    </div>
  );
};

const TestimonialsSection = ({ testimonialData, theme = "default" }) => {
  if (!testimonialData || testimonialData.length === 0) return null;
  
  const pColor = theme === "dark" ? "text-gray-400" : "text-gray-600";

  return (
    <section className="my-12 py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">
          Testimonials
        </h2>
        <p className={`text-center ${pColor} mb-10`}>
          What my clients say about me.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialData.map((testimonial, index) => (
            <motion.div
              key={testimonial._id || testimonial.author}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <TestimonialCard 
                quote={testimonial.quote}
                author={testimonial.author}
                theme={theme}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;