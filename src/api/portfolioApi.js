// src/api/portfolioApi.js
import axios from 'axios';

// Create Axios instance with baseURL. 
// No fallback URL, ensuring it ONLY uses the environment variable.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// --- Add Axios interceptor to automatically send token ---
api.interceptors.request.use(
  (config) => {
    // Get token from local storage
    const token = localStorage.getItem('token');
    if (token) {
      // If token exists, add it to the Authorization header
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // Return the modified config for the request to proceed
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);
// --------------------------------------------------------

// --- Portfolio Functions ---
export const createPortfolio = (portfolioData) => api.post('/portfolios', portfolioData);
export const getAllPublicPortfoliosApi = () => api.get('/portfolios/public'); // For public gallery
export const getMyPortfolios = () => api.get('/portfolios/my/list'); // For user's private list
export const getPortfolioById = (id) => api.get(`/portfolios/${id}`);
export const updatePortfolio = (id, portfolioData) => api.put(`/portfolios/${id}`, portfolioData);
export const deletePortfolio = (id) => api.delete(`/portfolios/${id}`);

// --- Authentication Functions ---
export const registerUser = (userData) => api.post('/auth/register', userData);
export const loginUser = (userData) => api.post('/auth/login', userData);