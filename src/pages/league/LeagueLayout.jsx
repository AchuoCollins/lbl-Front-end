import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import ReceiptToast from '../../components/ReceiptToast';
import { useTheme } from "../../context/ThemeContext";

export default function LeagueLayout() {
  const location = useLocation();
  const { darkMode } = useTheme();
  
  // Check if we're on the landing page
  const isLandingPage = location.pathname === "/";

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-[#12181A] text-[#EDEFEE]' 
        : 'bg-lbl-cream text-lbl-dark'
    } font-inter`}>
      <Navbar />
      
      {/* Main content - adjust padding based on whether sidebar is visible */}
      <main className={`${!isLandingPage ? 'md:ml-56' : ''} pt-16 p-6`}>
        <Outlet />
      </main>
      
      <ReceiptToast />
    </div>
  );
}