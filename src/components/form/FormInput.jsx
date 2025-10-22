import React from 'react';
import { useFormContext } from 'react-hook-form';
import { get } from 'react-hook-form'; // Import get

const FormInput = ({ label, name, type = 'text', placeholder, isTextarea = false }) => {
  const { register, formState: { errors } } = useFormContext();
  
  // Use 'get' to safely access nested error messages
  const error = get(errors, name);

  const commonProps = {
    id: name,
    placeholder: placeholder,
    ...register(name, { required: `${label} is required.` }),
    className: `mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm p-2.5 ${
      error ? 'border-red-500' : ''
    }`
  };

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {isTextarea ? (
        <textarea {...commonProps} rows={3}></textarea>
      ) : (
        <input type={type} {...commonProps} />
      )}
      {error && <p className="mt-1 text-xs text-red-600">{error.message}</p>}
    </div>
  );
};

export default FormInput;