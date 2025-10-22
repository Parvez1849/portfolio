import React from 'react';

// Single Skill Bar Component
const SkillBar = ({ name, level }) => (
  <div>
    <div className="flex justify-between mb-1">
      <span className="text-base font-medium text-gray-700">{name}</span>
      <span className="text-sm font-medium text-gray-700">{level}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div 
        className="bg-red-600 h-2.5 rounded-full" 
        style={{ width: `${level}%` }}
      ></div>
    </div>
  </div>
);

// Main Skills Section Component
const SkillsSection = ({ skillsData }) => {
  if (!skillsData || skillsData.length === 0) return null;

  return (
    <section className="my-12 py-12">
      <h2 className="text-4xl font-bold text-center mb-4">
        My <span className="text-theme-red">Skills</span>
      </h2>
      <p className="text-center text-gray-600 mb-10">
        Here is a breakdown of my professional skills.
      </p>
      
      <div className="grid md:grid-cols-3 gap-x-12 gap-y-8">
        {skillsData.map((skill) => (
          <SkillBar 
            key={skill.id || skill.name} 
            name={skill.name} 
            level={skill.level} 
          />
        ))}
      </div>
    </section>
  );
};
export default SkillsSection;