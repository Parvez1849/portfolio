import axios from 'axios';
import { auth } from '../firebase'; // Firebase auth import

// ✅ Axios instance with dynamic baseURL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api',
});

// 🔹 Add Firebase token automatically to requests
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

// 🔹 Portfolio API functions
export const createPortfolio = (portfolioData) => api.post('/portfolios', portfolioData);
export const getAllPublicPortfoliosApi = () => api.get('/portfolios/public');
export const getMyPortfolios = () => api.get('/portfolios/my/list');
export const getPortfolioById = (id) => api.get(`/portfolios/${id}`);
export const updatePortfolio = (id, portfolioData) => api.put(`/portfolios/${id}`, portfolioData);
export const deletePortfolio = (id) => api.delete(`/portfolios/${id}`);

