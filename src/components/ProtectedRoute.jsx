// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { authState } = useAuth();
  const { isAuthenticated, loading } = authState;

  // Agar authentication state abhi load ho rahi hai, toh kuch na dikhayein
  if (loading) {
    return <div>Loading...</div>; // Ya ek loading spinner dikha sakte hain
  }

  // Agar user logged in hai, toh us route ka content (Outlet) dikhayein
  // Agar logged in nahi hai, toh Login page par redirect kar dein
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;