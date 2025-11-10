import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';

const TestimonialsStep = () => {
  const { control, register } = useFormContext();
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "testimonials"
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-800">Client Testimonials</h3>
        <button
          type="button"
          onClick={() => append({ quote: '', author: '' })}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700"
        >
          + Add Testimonial
        </button>
      </div>

      <div className="space-y-6">
        {fields.map((item, index) => (
          <div key={item.id} className="p-4 border rounded-lg relative bg-gray-50">
            <h4 className="font-semibold mb-3">Testimonial #{index + 1}</h4>
            
            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
            >
              X
            </button>
            
            <div className="grid grid-cols-1 gap-4">
              <textarea
                {...register(`testimonials.${index}.quote`)}
                placeholder="Client's Quote"
                className="block w-full rounded-md border-gray-300 shadow-sm p-2.5"
                rows={3}
              />
              <input
                {...register(`testimonials.${index}.author`)}
                placeholder="Author's Name (e.g., Client A, CEO of XYZ)"
                className="block w-full rounded-md border-gray-300 shadow-sm p-2.5"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsStep;