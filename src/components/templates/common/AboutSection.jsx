import React from 'react';

const AboutSection = ({ aboutData }) => {
  if (!aboutData) return null;
  
  const { bio, location, email, phone, socials } = aboutData;

  return (
    <section className="my-12 py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">
          About <span className="text-theme-red">Me</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
          {/* Bio Column */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Biography</h3>
            <p className="text-gray-600 leading-relaxed">
              {bio}
            </p>
          </div>
          
          {/* Details Column */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Personal Details</h3>
            <div className="space-y-2">
              <p><strong>Location:</strong> {location}</p>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Phone:</strong> {phone}</p>
            </div>
            
            {socials && (
              <div className="mt-6">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Socials</h4>
                <div className="flex space-x-4">
                  {socials.linkedin && <a href={socials.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">LinkedIn</a>}
                  {socials.github && <a href={socials.github} target="_blank" rel="noreferrer" className="text-gray-800 hover:underline">GitHub</a>}
                  {socials.twitter && <a href={socials.twitter} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">Twitter</a>}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;