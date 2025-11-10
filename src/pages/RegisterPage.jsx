// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleRegister = async () => {
    setError("");
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/professionals");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 border rounded-lg shadow-lg bg-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Register / Login</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <button
        onClick={handleGoogleRegister}
        disabled={loading}
        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
      >
        {loading ? "Processing..." : "Continue with Google"}
      </button>
    </div>
  );
};

export default RegisterPage;






