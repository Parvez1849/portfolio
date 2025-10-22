// src/components/form/ImageUploader.jsx
import React, { useState } from 'react';
import axios from 'axios';

const CLOUDINARY_CLOUD_NAME = "dhvdlw4s6"; 
const CLOUDINARY_UPLOAD_PRESET = "parvez"; // Your 'unsigned' preset

const ImageUploader = ({ onUploadSuccess, accept = "*/*", labelText = "Upload File (Image, PDF, etc.)" }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    
    // The 'access_mode' line has been REMOVED from here

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      
      const fileUrl = response.data.secure_url;
      onUploadSuccess(fileUrl);
      setLoading(false);

    } catch (err) {
      console.error("Cloudinary upload failed:", err);
      // Try to get a more specific error message from Cloudinary's response
      const errorMsg = err.response?.data?.error?.message || "File upload failed. Please try again.";
      setError(errorMsg);
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {labelText}
      </label>
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        disabled={loading}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
          file:text-sm file:font-semibold file:bg-theme-red file:text-white
          hover:file:bg-red-600 cursor-pointer" // Added cursor-pointer
      />
      {loading && <p className="text-sm text-blue-600 mt-1">Uploading...</p>}
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
};

export default ImageUploader;