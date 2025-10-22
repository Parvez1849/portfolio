// src/pages/RegisterPage.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api/portfolioApi';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { register: registerAuth } = useAuth(); // Rename to avoid conflict
  const [apiError, setApiError] = React.useState('');

  const onSubmit = async (data) => {
     setApiError('');
    try {
      const response = await registerUser(data);
      registerAuth(response.data); // Update global state
      navigate('/professionals'); // Redirect after registration
    } catch (error) {
      console.error('Registration failed:', error);
       setApiError(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 border rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>
       {apiError && <p className="text-red-500 text-center mb-4">{apiError}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
         <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
            className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : ''}`}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
             className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : ''}`}
          />
           {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' }})}
             className={`w-full p-2 border rounded ${errors.password ? 'border-red-500' : ''}`}
          />
           {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Register
        </button>
      </form>
       <p className="mt-4 text-center text-sm">
        Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login here</Link>
      </p>
    </div>
  );
};

export default RegisterPage;