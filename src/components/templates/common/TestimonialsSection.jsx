import React from 'react';

const TestimonialCard = ({ quote, author }) => (
  <div className="bg-white p-8 rounded-lg shadow-lg text-center">
    <p className="text-gray-600 italic text-lg mb-4">"{quote}"</p>
    <p className="font-semibold text-theme-red">- {author}</p>
  </div>
);

const TestimonialsSection = ({ testimonialData }) => {
  if (!testimonialData || testimonialData.length === 0) return null;

  return (
    <section className="my-12 py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">
          Testimonials
        </h2>
        <p className="text-center text-gray-600 mb-10">
          What my clients say about me.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialData.map((testimonial) => (
            <TestimonialCard 
              key={testimonial.id || testimonial.author}
              quote={testimonial.quote}
              author={testimonial.author}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;