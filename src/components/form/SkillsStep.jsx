// src/components/form/SkillsStep.jsx

import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';

const SkillsStep = () => {
  const { control, register } = useFormContext();
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills"
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-800">Your Skills</h3>
        <button
          type="button"
          onClick={() => append({ name: '', level: 50 })} // Nayi skill 50% se start hogi
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700"
        >
          + Add Skill
        </button>
      </div>

      <div className="space-y-6">
        {fields.map((item, index) => (
          <div key={item.id} className="p-4 border rounded-lg relative bg-gray-50">
            <h4 className="font-semibold mb-3">Skill #{index + 1}</h4>
            
            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
            >
              X
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                {...register(`skills.${index}.name`)}
                placeholder="Skill Name (e.g., React, Photoshop)"
                className="block w-full rounded-md border-gray-300 shadow-sm p-2.5"
              />
              {/* Skill Level ke liye Range Slider */}
              <div className="flex items-center space-x-3">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  {...register(`skills.${index}.level`)}
                  className="w-full"
                />
                {/* Optional: Slider ki value dikhane ke liye (Advanced) */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsStep;