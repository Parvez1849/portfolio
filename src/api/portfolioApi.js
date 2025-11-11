// src/api/portfolioApi.js
import axios from 'axios';
import { auth } from '../firebase';

// ✅ Backend base URL (ensure no trailing slash)
const BASE_URL =
  (import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '')) ||
  'http://localhost:5001/api';

const api = axios.create({
  baseURL: BASE_URL, // Example: https://portfolio-backend.vercel.app/api
});

// --- Firebase Auth Token Interceptor ---
api.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;

    if (user) {
      const token = await user.getIdToken();
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- Portfolio APIs ---
export const createPortfolio = (portfolioData) => api.post('/portfolios', portfolioData);
export const getAllPublicPortfoliosApi = () => api.get('/portfolios/public');
export const getMyPortfolios = () => api.get('/portfolios/my/list');
export const getPortfolioById = (id) => api.get(`/portfolios/${id}`);
export const updatePortfolio = (id, portfolioData) => api.put(`/portfolios/${id}`, portfolioData);
export const deletePortfolio = (id) => api.delete(`/portfolios/${id}`);

export default api;
