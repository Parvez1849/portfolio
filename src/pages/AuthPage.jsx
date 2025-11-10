// src/pages/AuthPage.jsx
import React, { useEffect } from "react";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../css/auth.css";

const AuthPage = () => {
  const { authState, login } = useAuth();
  const navigate = useNavigate();

  // ✅ Agar user already logged in hai, directly redirect kar do
  useEffect(() => {
    if (authState.isAuthenticated) {
      navigate("/"); // Choose Template page
    }
  }, [authState.isAuthenticated, navigate]);

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();

      const userData = {
        user: {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          photo: user.photoURL,
        },
        token,
      };

      login(userData);

      // ✅ Redirect immediately after successful login
      navigate("/");
    } catch (error) {
      console.error("Google sign-in failed:", error);
      alert("Sign-in failed. Please try again!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome to Portfolio Builder</h2>
        <p>Sign in with Google to create your professional portfolio.</p>
        <button className="google-btn" onClick={handleGoogleSignIn}>
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google Logo"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default AuthPage;