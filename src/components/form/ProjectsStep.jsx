// src/components/form/ProjectsStep.jsx
import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import FormInput from './FormInput';
import ImageUploader from './ImageUploader'; // Uploader import karein

const ProjectsStep = () => {
  const { control, register, setValue } = useFormContext(); 
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects"
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-800">Your Portfolio Projects</h3>
        <button
          type="button"
          onClick={() => append({ title: '', description: '', image: '', link: '' })}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700"
        >
          + Add Project
        </button>
      </div>

      <div className="space-y-6">
        {fields.map((item, index) => {
          
          const handleUpload = (url) => {
            setValue(`projects.${index}.image`, url, { shouldValidate: true }); 
            alert(`Project #${index + 1} file uploaded!`);
          };

          return (
            <div key={item.id} className="p-4 border rounded-lg relative bg-gray-50 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">Project #{index + 1}</h4>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
                >
                  X
                </button>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <input
                  {...register(`projects.${index}.title`)}
                  placeholder="Project Title"
                  className="block w-full rounded-md border-gray-300 shadow-sm p-2.5"
                />
                <textarea
                  {...register(`projects.${index}.description`)}
                  placeholder="Project Description"
                  className="block w-full rounded-md border-gray-300 shadow-sm p-2.5"
                  rows={3}
                />
                <input
                  {...register(`projects.${index}.link`)}
                  placeholder="Project Live Link (Optional)"
                  className="block w-full rounded-md border-gray-300 shadow-sm p-2.5"
                />
                
                {/* --- Project Image/File Upload Logic --- */}
                <input
                  {...register(`projects.${index}.image`)}
                  placeholder="Project Image/File URL (Yahaan link paste karein YA neeche se upload karein)"
                  className="block w-full rounded-md border-gray-300 shadow-sm p-2.5"
                />
                <p className="text-center text-sm font-medium text-gray-500">- OR -</p>
                
                {/* YAHAN CHANGE KIYA GAYA HAI */}
                <ImageUploader 
                  onUploadSuccess={handleUpload}
                  // Hum ise Image, PDF, aur DOCX accept karne denge
                  accept="image/*,.pdf,.doc,.docx" 
                  labelText="Upload Project File (Image/PDF/DOCX)"
                />
                
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsStep;