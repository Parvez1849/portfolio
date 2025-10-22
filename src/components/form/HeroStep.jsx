// src/components/form/HeroStep.jsx
import React, { useState, useRef } from 'react';
import FormInput from './FormInput';
import { useFormContext } from 'react-hook-form';
import axios from 'axios';

// React Crop library import
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  convertToPixelCrop,
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css'; // Styles import

// --- **ENTER YOUR CLOUDINARY INFO HERE** ---
const CLOUDINARY_CLOUD_NAME = "dhvdlw4s6"; // Your Cloud Name
const CLOUDINARY_UPLOAD_PRESET = "parvez"; // Your 'unsigned' preset name
// ----------------------------------------

// Helper function to draw cropped image onto a canvas
function setCanvasPreview(image, canvas, crop) {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('No 2d context');
  }
  const pixelRatio = window.devicePixelRatio;
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = 'high';
  ctx.save();

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  ctx.translate(-cropX, -cropY);
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
  );
  ctx.restore();
}

// --- Component Start ---
const HeroStep = () => {
  const { setValue, watch } = useFormContext();

  // State for cropping
  const [imgSrc, setImgSrc] = useState('');
  const [crop, setCrop] = useState();
  const [showCropper, setShowCropper] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const imgRef = useRef(null);
  const canvasRef = useRef(null);

  // Constants for square crop
  const ASPECT_RATIO = 1;
  const MIN_DIMENSION = 150; // Minimum size for the crop square

  // Handle file selection
  const onSelectFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const imageUrl = reader.result?.toString() || '';
      setImgSrc(imageUrl);
      setShowCropper(true); // Open the cropper modal
      e.target.value = null; // Reset input field
    });
    reader.readAsDataURL(file);
  };

  // Set initial crop when image loads in the cropper
  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;
    const initialCrop = makeAspectCrop(
      { unit: '%', width: cropWidthInPercent },
      ASPECT_RATIO,
      width,
      height,
    );
    const centeredCrop = centerCrop(initialCrop, width, height);
    setCrop(centeredCrop);
  };

  // Function to upload the cropped image
  const uploadCroppedImage = async () => {
    if (!imgRef.current || !canvasRef.current || !crop) return;

    // Draw the cropped image onto the hidden canvas
    setCanvasPreview(
      imgRef.current,
      canvasRef.current,
      convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height)
    );

    // Get the image data (Blob) from the canvas
    canvasRef.current.toBlob(async (blob) => {
      if (!blob) {
        setError('Could not create image blob.');
        return;
      }

      setUploading(true);
      setError('');
      const formData = new FormData();
      formData.append('file', blob, `profile_${Date.now()}.png`);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      // 'access_mode' has been removed

      try {
        const response = await axios.post(
          // Use '/auto/upload' endpoint for flexibility
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );

        const imageUrl = response.data.secure_url;
        // Update the form field with the new Cloudinary URL
        setValue('hero.profileImage', imageUrl, { shouldValidate: true });
        alert('Profile image cropped and link set!');
        setShowCropper(false); // Close the modal
        setImgSrc(''); // Clear the image source

      } catch (err) {
        console.error("Cloudinary upload failed:", err);
        // Provide more specific error if possible
        const errorMsg = err.response?.data?.error?.message || "Image upload failed. Please try again.";
        setError(errorMsg);
      } finally {
        setUploading(false);
      }
    }, 'image/png', 0.9); // Use PNG format, 90% quality
  };

  // Watch the current value of the profile image URL for preview
  const currentImageUrl = watch('hero.profileImage');

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">Hero Section Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput label="Full Name" name="hero.name" placeholder="e.g., Suresh Krishnan" />
        <FormInput label="Title / Role" name="hero.title" placeholder="e.g., Lead Drone Technician" />
      </div>
      <FormInput label="Tagline" name="hero.tagline" placeholder="e.g., Expert in aerial systems..." />

      {/* --- Image Upload Logic --- */}
      <FormInput
        label="Profile Image URL"
        name="hero.profileImage"
        placeholder="Paste image link here OR upload below"
      />

      {/* Profile Image Preview */}
      {currentImageUrl && (
        <div className="mt-2 text-center">
          <p className="text-sm font-medium text-gray-600 mb-1">Current Image:</p>
          <img src={currentImageUrl} alt="Current profile" className="w-32 h-32 rounded-full object-cover mx-auto border" />
        </div>
      )}

      <p className="text-center text-sm font-medium text-gray-500">- OR -</p>

      {/* File Input to trigger cropper */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload New Profile Image (Cropper will open)
        </label>
        <input
          type="file"
          accept="image/*" // Accept only image files
          onChange={onSelectFile}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-theme-red file:text-white
            hover:file:bg-red-600 cursor-pointer" // Added cursor-pointer
        />
      </div>
      {/* --- End Image Upload Logic --- */}

      {/* --- Cropper Modal --- */}
      {showCropper && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg max-w-xl w-full">
            <h4 className="text-xl font-semibold mb-4">Crop Your Image</h4>
            {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
            <div className="max-h-[60vh] overflow-auto mb-4 bg-gray-100 p-2 border rounded"> {/* Added background and border */}
              <ReactCrop
                crop={crop}
                onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
                aspect={ASPECT_RATIO} // Enforce square aspect ratio
                minWidth={MIN_DIMENSION} // Minimum crop size
                keepSelection // Keep selection when clicking outside
              >
                <img
                  ref={imgRef}
                  src={imgSrc}
                  alt="Upload preview"
                  style={{ maxHeight: '70vh', userSelect: 'none' }} // Prevent text selection
                  onLoad={onImageLoad} // Set initial crop on load
                />
              </ReactCrop>
            </div>
            {/* Hidden Canvas for generating cropped image */}
            <canvas ref={canvasRef} style={{ display: 'none', border: '1px solid black' }}></canvas>

            <div className="flex justify-end space-x-3 mt-4">
              <button
                type="button"
                onClick={() => { setShowCropper(false); setImgSrc(''); setError(''); }} // Clear error on cancel
                disabled={uploading}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={uploadCroppedImage}
                // Disable button if uploading or no valid crop exists
                disabled={uploading || !crop?.width || !crop?.height}
                className={`px-4 py-2 rounded text-white ${uploading || !crop?.width || !crop?.height ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {uploading ? 'Uploading...' : 'Crop & Upload'}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* --- End Cropper Modal --- */}
    </div>
  );
};

export default HeroStep;