// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute'; 
import SelectTemplate from './pages/SelectTemplate';
import CreatePortfolio from './pages/CreatePortfolio';
import ProfessionalsList from './pages/ProfessionalsList'; // User's private list
import PublicGallery from './pages/PublicGallery';       // <-- Import Public Gallery
import PortfolioDetail from './pages/PortfolioDetail';
import PreviewPage from './pages/PreviewPage';
import EditPortfolio from './pages/EditPortfolio';
import LoginPage from './pages/LoginPage'; 
import RegisterPage from './pages/RegisterPage'; 

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/gallery" element={<PublicGallery />} /> {/* <-- ADD ROUTE for Public Gallery */}
        <Route path="/portfolio/:id" element={<PortfolioDetail />} /> 
        <Route path="/preview/:id" element={<PreviewPage />} /> 
        <Route path="/" element={<SelectTemplate />} /> 

        {/* --- Protected Routes --- */}
        <Route element={<ProtectedRoute />}>
          <Route path="/create-portfolio" element={<CreatePortfolio />} />
          <Route path="/edit-portfolio/:id" element={<EditPortfolio />} />
          <Route path="/professionals" element={<ProfessionalsList />} /> {/* User's private list is protected */}
        </Route>

        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
