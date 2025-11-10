// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import SelectTemplate from "./pages/SelectTemplate";
import CreatePortfolio from "./pages/CreatePortfolio";
import ProfessionalsList from "./pages/ProfessionalsList";
import PublicGallery from "./pages/PublicGallery";
import PortfolioDetail from "./pages/PortfolioDetail";
import PreviewPage from "./pages/PreviewPage";
import AuthPage from "./pages/AuthPage";
import EditPortfolio from "./pages/EditPortfolio"; // ✅ Ye line add karo

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />

        <Route path="/gallery" element={<PublicGallery />} />
        <Route path="/portfolio/:id" element={<PortfolioDetail />} />
        <Route path="/preview/:id" element={<PreviewPage />} />
        <Route path="/" element={<SelectTemplate />} />

        {/* Protected */}
        <Route element={<ProtectedRoute />}>
          <Route path="/create-portfolio" element={<CreatePortfolio />} />
          <Route path="/edit-portfolio/:id" element={<EditPortfolio />} />
          <Route path="/professionals" element={<ProfessionalsList />} />
        </Route>

        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;






