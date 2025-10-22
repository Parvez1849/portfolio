// src/pages/PortfolioDetail.jsx
import React, { useState, useEffect } from 'react'; // <-- Check this line
import { useParams } from 'react-router-dom';     // <-- Check this line
import { getPortfolioById } from '../api/portfolioApi'; // <-- Check this line

// Import template components
import Template1 from '../components/templates/Template1'; // <-- Check this line
import Template2 from '../components/templates/Template2'; // <-- Check this line

// --- ADD LOG 0 ---
console.log("[PortfolioDetail] File loaded, component function starting..."); 
// -----------------

const PortfolioDetail = () => {
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("[PortfolioDetail] Fetching data for ID:", id); // Log 1
    const fetchPortfolio = async () => {
      setLoading(true); 
      setError(null);   
      try {
        const response = await getPortfolioById(id);
        console.log("[PortfolioDetail] Data fetched:", response.data); // Log 2
        setPortfolio(response.data);
      } catch (err) {
        console.error("[PortfolioDetail] Fetch error:", err); // Log 3
        if (err.response && err.response.status === 404) {
          setError('Portfolio not found.');
        } else {
          setError('Failed to load portfolio data.');
        }
        setPortfolio(null); 
      } finally {
        console.log("[PortfolioDetail] Fetch attempt finished, setting loading false."); // Log 4
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [id]); 

  // --- Rendering Logic ---
  if (loading) {
    console.log("[PortfolioDetail] Rendering: Loading state..."); // Log 5
    return <div className="text-center p-20 text-2xl font-semibold">Loading Portfolio...</div>;
  }
  if (error) {
    console.error("[PortfolioDetail] Rendering: Error state -", error); // Log 6
    return <div className="text-center p-20 text-2xl font-semibold text-red-500">{error}</div>;
  }
  if (!portfolio) {
    console.warn("[PortfolioDetail] Rendering: No portfolio data available."); // Log 7
    return <div className="text-center p-10">Portfolio data could not be loaded.</div>;
  }

  console.log("[PortfolioDetail] Rendering: Data ready, attempting to render template:", portfolio.templateId); // Log 8
  console.log("[PortfolioDetail] Data being sent to template:", portfolio); 

  // --- Switch Statement ---
  const templateIdString = String(portfolio.templateId);
  console.log("[PortfolioDetail] Checking templateId:", templateIdString); // Log 9

  switch (templateIdString) {
    case '1':
      console.log("[PortfolioDetail] Rendering Template 1..."); // Log 10
      return <Template1 data={portfolio} />;
    case '2':
      console.log("[PortfolioDetail] Rendering Template 2..."); // Log 11
      return <Template2 data={portfolio} />;
    default:
      console.error("[PortfolioDetail] Rendering: Unknown template ID:", portfolio.templateId); // Log 12
      return <div className="text-center p-10">Error: Unknown template ID encountered.</div>;
  }
};

export default PortfolioDetail;