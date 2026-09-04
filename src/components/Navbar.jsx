import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Heart, Ticket, Home, Users, Trophy, BarChart3, Calendar, Info, Newspaper, Tv, ShoppingBag, LifeBuoy, Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

// Navigation Links for Sidebar
const sidebarLinks = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/teams", icon: Users, label: "Teams" },
  // Standings and Stats are NOT in the sidebar anymore
  { to: "/schedule", icon: Calendar, label: "Schedule" },
  { to: "/about", icon: Info, label: "About" },
  { to: "/news", icon: Newspaper, label: "News" },
  { to: "/watch", icon: Tv, label: "Watch" },
  { to: "/support", icon: LifeBuoy, label: "Support" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { darkMode, toggleTheme } = useTheme();
  const location = useLocation();
  
  const isLandingPage = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  // Sidebar link class
  const getLinkClass = ({ isActive }) => {
    const baseClass = "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200";
    
    if (isActive) {
      return `${baseClass} bg-lbl-orange dark:bg-lbl-dark-orange text-white dark:text-[#12181A] shadow-md`;
    }
    
    return `${baseClass} hover:bg-lbl-orange/10 dark:hover:bg-white/10 hover:text-lbl-orange dark:hover:text-lbl-dark-orange`;
  };

  return (
    <>
      {/* Top Navigation Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled 
            ? darkMode
              ? "bg-[#12181A]/95 backdrop-blur-md border-b border-white/10"
              : "bg-lbl-cream/95 backdrop-blur-md border-b border-lbl-soft/20"
            : darkMode
              ? "bg-[#12181A] border-b border-white/5"
              : "bg-lbl-cream border-b border-lbl-soft/10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-lbl-orange to-[#c73b2b] dark:from-lbl-dark-orange dark:to-[#C8102E] flex items-center justify-center font-bebas text-white dark:text-[#12181A] text-sm">
              L
            </div>
            <span className="font-bebas tracking-wider text-xl text-gray-900 dark:text-white">LBL</span>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-lbl-orange/10 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle theme"
              style={{ color: darkMode ? 'white' : '#1a1a1a' }}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Tickets - Desktop only */}
            <Link
              to="/tickets"
              className="hidden md:flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full border border-lbl-orange/40 dark:border-lbl-dark-orange/40 text-lbl-orange dark:text-lbl-dark-orange hover:bg-lbl-orange/10 dark:hover:bg-lbl-dark-orange/10 transition-colors"
            >
              <Ticket size={14} /> Tickets
            </Link>

            {/* Donate - Desktop only */}
            <Link
              to="/donate"
              className="hidden md:flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full bg-lbl-orange dark:bg-lbl-dark-orange text-white dark:text-[#12181A] hover:bg-lbl-orange-dark dark:hover:bg-[#f0ba5f] transition-colors"
            >
              <Heart size={14} /> Donate
            </Link>

            {/* Menu Button - Always visible on landing page (desktop + mobile) */}
            {isLandingPage ? (
              <button 
                className="p-2 hover:bg-lbl-orange/10 dark:hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
                style={{ color: darkMode ? 'white' : '#1a1a1a' }}
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            ) : (
              /* Menu Button - Only on mobile for non-landing pages */
              <button 
                className="md:hidden p-2 hover:bg-lbl-orange/10 dark:hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
                style={{ color: darkMode ? 'white' : '#1a1a1a' }}
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Desktop Sidebar - Only on non-landing pages */}
      {!isLandingPage && (
        <aside className={`hidden md:block fixed top-16 left-0 bottom-0 w-56 border-r overflow-y-auto z-40 transition-colors duration-300 ${
          darkMode 
            ? 'bg-[#12181A] border-white/5' 
            : 'bg-white border-gray-200 shadow-lg'
        }`}>
          <nav className="p-4 space-y-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={getLinkClass}
                  style={({ isActive }) => ({
                    color: isActive ? undefined : (darkMode ? 'white' : '#1a1a1a'),
                  })}
                  onClick={() => setMenuOpen(false)}
                >
                  <Icon size={18} className="flex-shrink-0" style={{ color: darkMode ? 'white' : '#1a1a1a' }} />
                  <span>{link.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </aside>
      )}

      {/* Slide-in Menu - Available when menu is open */}
      <div 
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        
        {/* Slide-in Menu from Left */}
        <div 
          className={`absolute top-0 left-0 h-full w-80 shadow-2xl border-r transition-transform duration-300 ${
            darkMode 
              ? 'bg-[#1A2124]/95 backdrop-blur-xl border-white/10' 
              : 'bg-white border-gray-200 shadow-lg'
          } ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          {/* Menu Header */}
          <div className={`flex items-center justify-between p-4 border-b ${
            darkMode ? 'border-white/10' : 'border-gray-200'
          }`}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-lbl-orange to-[#c73b2b] dark:from-lbl-dark-orange dark:to-[#C8102E] flex items-center justify-center font-bebas text-white dark:text-[#12181A] text-sm">
                L
              </div>
              <span className={`font-bebas tracking-wider text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>LBL</span>
            </div>
            <button 
              onClick={() => setMenuOpen(false)}
              className={`p-2 rounded-lg transition-colors ${darkMode ? 'text-white hover:bg-white/10' : 'text-gray-900 hover:bg-lbl-orange/10'}`}
            >
              <X size={20} />
            </button>
          </div>

          {/* Menu Navigation */}
          <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-80px)]">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={handleLinkClick}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    darkMode 
                      ? 'text-white hover:bg-white/10 hover:text-white' 
                      : 'text-gray-900 hover:bg-lbl-orange/10 hover:text-lbl-orange'
                  }`}
                >
                  <Icon size={18} className="flex-shrink-0" />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            {/* Divider and Action Buttons */}
            <div className={`pt-4 mt-4 border-t ${darkMode ? 'border-white/10' : 'border-gray-200'} space-y-2`}>
              <Link
                to="/tickets"
                onClick={handleLinkClick}
                className={`flex items-center justify-center gap-2 text-sm font-semibold px-4 py-3 rounded-full border transition-colors w-full ${
                  darkMode 
                    ? 'border-lbl-dark-orange/40 text-lbl-dark-orange hover:bg-lbl-dark-orange/10' 
                    : 'border-lbl-orange/40 text-lbl-orange hover:bg-lbl-orange/10'
                }`}
              >
                <Ticket size={16} /> Tickets
              </Link>
              <Link
                to="/donate"
                onClick={handleLinkClick}
                className={`flex items-center justify-center gap-2 text-sm font-semibold px-4 py-3 rounded-full transition-colors w-full ${
                  darkMode 
                    ? 'bg-lbl-dark-orange text-[#12181A] hover:bg-[#f0ba5f]' 
                    : 'bg-lbl-orange text-white hover:bg-lbl-orange-dark'
                }`}
              >
                <Heart size={16} /> Donate
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Main content spacer */}
      <div className="h-16" />
    </>
  );
}