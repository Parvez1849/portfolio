// src/api/portfolioApi.js
import axios from 'axios';
import { auth } from '../firebase'; // Import auth from your firebase.js file

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api',
});

// --- Axios interceptor updated for Firebase ---
api.interceptors.request.use(
  async (config) => {
    // Get the currently logged-in user from Firebase
    const user = auth.currentUser; 
    
    if (user) {
      // If the user exists, get their Firebase ID Token
      const token = await user.getIdToken();
      // Add the token to the Authorization header
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);
// ------------------------------------------------

// --- Portfolio Functions (These stay the same) ---
export const createPortfolio = (portfolioData) => api.post('/portfolios', portfolioData);
export const getAllPublicPortfoliosApi = () => api.get('/portfolios/public');
export const getMyPortfolios = () => api.get('/portfolios/my/list'); 
export const getPortfolioById = (id) => api.get(`/portfolios/${id}`);
export const updatePortfolio = (id, portfolioData) => api.put(`/portfolios/${id}`, portfolioData);
export const deletePortfolio = (id) => api.delete(`/portfolios/${id}`);

// --- Authentication Functions (REMOVED) ---
// We remove registerUser and loginUser because Firebase handles this now.