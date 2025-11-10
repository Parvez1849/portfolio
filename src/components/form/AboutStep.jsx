// src/components/form/AboutStep.jsx
import React from 'react';
import FormInput from './FormInput';
import ImageUploader from './ImageUploader'; 
import { useFormContext } from 'react-hook-form'; 

const AboutStep = () => {
  const { setValue } = useFormContext();

  const handleResumeUpload = (url) => {
    setValue('about.resumeUrl', url, { shouldValidate: true });
    alert("Resume uploaded and link set!");
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">About Me Section</h3>
      
      <FormInput
        label="Biography"
        name="about.bio"
        placeholder="Write a short bio about yourself..."
        isTextarea={true}
      />

      {/* --- Resume Upload Logic --- */}
      <FormInput
        label="Resume/CV Link"
        name="about.resumeUrl"
        placeholder="Yahaan link paste karein YA neeche se upload karein"
      />
      <p className="text-center text-sm font-medium text-gray-500">- OR -</p>
      
      {/* YAHAN CHANGE KIYA GAYA HAI */}
      <ImageUploader 
        onUploadSuccess={handleResumeUpload}
        accept=".pdf,.doc,.docx,image/*" // Resume ab image bhi ho sakta hai
        labelText="Upload Resume (PDF, DOCX, or Image)" // Label text badla
      />
      {/* --- End Resume Upload --- */}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Email"
          name="about.email"
          type="email"
          placeholder="your.email@example.com"
        />
        <FormInput
          label="Phone"
          name="about.phone"
          placeholder="+91..."
        />
        <FormInput
          label="Location"
          name="about.location"
          placeholder="e.g., Chennai, India"
        />
        <FormInput
          label="LinkedIn URL"
          name="about.socials.linkedin"
          placeholder="https://linkedin.com/in/..."
        />
        <FormInput
          label="GitHub URL"
          name="about.socials.github"
          placeholder="https://github.com/..."
        />
      </div>
    </div>
  );
};
export default AboutStep;