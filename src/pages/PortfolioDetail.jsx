// src/pages/PortfolioDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPortfolioById } from '../api/portfolioApi';

// Templates import karein
import Template1 from '../components/templates/Template1';
import Template2 from '../components/templates/Template2';
import Template3 from '../components/templates/Template3'; 
import Template4 from '../components/templates/Template4'; // <-- Naya import

const PortfolioDetail = () => {
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      setLoading(true); 
      setError(null);   
      try {
        const response = await getPortfolioById(id);
        setPortfolio(response.data);
      } catch (err) { 
        if (err.response && err.response.status === 404) {
          setError('Portfolio not found.');
        } else {
          setError('Failed to load portfolio data.');
        }
        setPortfolio(null); 
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, [id]); 

  if (loading) return <div className="text-center p-20 text-2xl font-semibold">Loading Portfolio...</div>;
  if (error) return <div className="text-center p-20 text-2xl font-semibold text-red-500">{error}</div>;
  if (!portfolio) return <div className="text-center p-10">Portfolio data could not be loaded.</div>;

  const templateIdString = String(portfolio.templateId);

  switch (templateIdString) {
    case '1':
      return <Template1 data={portfolio} />;
    case '2':
      return <Template2 data={portfolio} />;
    case '3':
      return <Template3 data={portfolio} />;
    // --- NAYA CASE 4 ---
    case '4':
      return <Template4 data={portfolio} />;
    // -------------------
    default:
      // Agar purana data hai jo 1,2,3,4 nahi hai, toh Template 1 dikhaye
      return <Template1 data={portfolio} />;
  }
};

export default PortfolioDetail;