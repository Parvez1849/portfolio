// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: true,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        const userPayload = {
          uid: user.uid,
          email: user.email,
          name: user.displayName || user.email,
          phone: user.phoneNumber,
        };
        localStorage.setItem("user", JSON.stringify(userPayload));
        localStorage.setItem("token", token);

        setAuthState({
          user: userPayload,
          token,
          isAuthenticated: true,
          loading: false,
        });
      } else {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setAuthState({
          user: null,
          token: null,
          isAuthenticated: false,
          loading: false,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  // ✅ Add login function
  const login = (userData) => {
    setAuthState({
      user: userData.user || null,
      token: userData.token || null,
      isAuthenticated: true,
      loading: false,
    });
  };

  const logout = async () => {
    await signOut(auth);
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

