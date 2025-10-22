// src/components/form/ServicesStep.jsx
import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import FormInput from './FormInput'; // Yeh FormInput.jsx ko use karega

const ServicesStep = () => {
  const { control, register } = useFormContext();
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "services"
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-800">Your Services</h3>
        <button
          type="button"
          onClick={() => append({ title: '', description: '' })}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700"
        >
          + Add Service
        </button>
      </div>

      <div className="space-y-6">
        {fields.map((item, index) => (
          <div key={item.id} className="p-4 border rounded-lg relative">
            <h4 className="font-semibold mb-3">Service #{index + 1}</h4>
            <div className="grid grid-cols-1 gap-4">
              <input
                {...register(`services.${index}.title`)}
                placeholder="Service Title"
                className="block w-full rounded-md border-gray-300 shadow-sm p-2.5"
              />
              <textarea
                {...register(`services.${index}.description`)}
                placeholder="Service Description"
                className="block w-full rounded-md border-gray-300 shadow-sm p-2.5"
                rows={3}
              />
            </div>
            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ServicesStep;