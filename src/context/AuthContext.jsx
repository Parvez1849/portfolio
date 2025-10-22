// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,     // Start null, let useEffect set it
    user: null,      // Start null
    isAuthenticated: false, // Start false
    loading: true,   // Start loading true
  });

  // --- NAYA useEffect Hook ---
  // Yeh hook component ke pehli baar load hone par chalega
  useEffect(() => {
    // localStorage se token aur user data padhne ki koshish karo
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    let user = null;
    try {
      user = userString ? JSON.parse(userString) : null;
    } catch (error) {
      console.error("Error parsing user from localStorage", error);
      localStorage.removeItem('user'); // Corrupted data ko hata dein
    }

    if (token && user) {
      // Agar token aur user data mila, toh user ko logged in maano
      // Note: Hum yahaan token ki validity check nahi kar rahe, production mein karna chahiye
      setAuthState({
        token: token,
        user: user,
        isAuthenticated: true,
        loading: false, // IMPORTANT: Loading ko false set karo
      });
    } else {
      // Agar token ya user data nahi mila, toh user logged out hai
      setAuthState({
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false, // IMPORTANT: Loading ko false set karo
      });
      // Extra safety: Agar token nahi hai toh user data bhi remove kar do
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    // Empty dependency array [] ka matlab hai yeh effect sirf ek baar chalega jab component mount hoga
  }, []); 
  // --- End NAYA useEffect Hook ---

  // Login function (localStorage set karta hai aur state update karta hai)
  const login = (userData) => {
    if (!userData || !userData.token || !userData.userId || !userData.name) {
       console.error("Login function received invalid userData:", userData);
       return;
    }
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify({ id: userData.userId, name: userData.name }));
    setAuthState({
      token: userData.token,
      user: { id: userData.userId, name: userData.name },
      isAuthenticated: true,
      loading: false, // Login ke baad loading false hai
    });
  };

  // Logout function (localStorage clear karta hai aur state update karta hai)
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthState({
      token: null,
      user: null,
      isAuthenticated: false,
      loading: false, // Logout ke baad loading false hai
    });
  };

  // Register function (successful register ke baad seedha login kar deta hai)
  const register = (userData) => {
    login(userData); // Reuse login logic
  };

  // Context Provider jo state aur functions ko children tak pahunchata hai
  return (
    <AuthContext.Provider value={{ authState, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook taaki AuthContext ko use karna aasan ho
export const useAuth = () => {
  return useContext(AuthContext);
};