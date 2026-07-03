/**
 * Navbar.jsx - Navigation Bar Component
 * 
 * Features:
 * - Glassmorphism design with blur backdrop
 * - Smooth scroll links to home page sections
 * - React Router navigation to /chat page
 * - Dark/Light mode toggle button
 * - Mobile-responsive hamburger menu
 * - Scroll-aware styling (background opacity changes)
 */

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import {
  FiMoon, FiSun, FiMenu, FiX, FiMessageSquare, FiZap
} from 'react-icons/fi';

export default function Navbar() {
  // State for mobile menu open/closed
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // State for scroll position (to change navbar appearance when scrolled)
  const [scrolled, setScrolled] = useState(false);
  
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  // Detect scroll to apply background to navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  /**
   * Smooth scroll to a section on the home page.
   * If not on home page, navigate there first.
   */
  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  const isOnChat = location.pathname === '/chat';

  // Navigation links configuration
  const navLinks = [
    { label: 'Home',     action: () => scrollToSection('home') },
    { label: 'About',    action: () => scrollToSection('about') },
    { label: 'Features', action: () => scrollToSection('features') },
  ];

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled || isOnChat
          ? 'glass dark:border-b dark:border-primary-500/20 border-b border-gray-200/50'
          : 'bg-transparent'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ─── Logo / Brand ─── */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
            aria-label="Smart NLP Chatbot Home"
          >
            {/* Animated bot icon */}
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-200">
              <FiZap className="text-white text-lg" />
            </div>
            <span className="font-bold text-lg text-gray-900 dark:text-white">
              Smart<span className="gradient-text">NLP</span>
            </span>
          </Link>

          {/* ─── Desktop Navigation ─── */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, action }) => (
              <button
                key={label}
                onClick={action}
                className="nav-link px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-500/10"
              >
                {label}
              </button>
            ))}
          </div>

          {/* ─── Right Side Actions ─── */}
          <div className="flex items-center gap-2">

            {/* Theme Toggle Button */}
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-all duration-200"
              aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={isDark ? 'Light Mode' : 'Dark Mode'}
            >
              {isDark
                ? <FiSun className="text-xl" />
                : <FiMoon className="text-xl" />
              }
            </button>

            {/* Chat CTA Button */}
            <Link
              to="/chat"
              id="nav-chat-btn"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white text-sm font-medium shadow-glow hover:shadow-glow-lg hover:scale-105 btn-glow transition-all duration-200"
            >
              <FiMessageSquare className="text-base" />
              Start Chatting
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileOpen(prev => !prev)}
              className="md:hidden p-2.5 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* ─── Mobile Menu Dropdown ─── */}
      <div
        className={`
          md:hidden glass border-t border-gray-200/30 dark:border-primary-500/20
          transition-all duration-300 ease-in-out overflow-hidden
          ${mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="px-4 py-3 space-y-1">
          {navLinks.map(({ label, action }) => (
            <button
              key={label}
              onClick={action}
              className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-500/10 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-150"
            >
              {label}
            </button>
          ))}
          
          {/* Mobile chat button */}
          <Link
            to="/chat"
            className="flex items-center gap-2 w-full px-4 py-3 rounded-xl gradient-primary text-white text-sm font-medium mt-2"
          >
            <FiMessageSquare />
            Start Chatting
          </Link>
        </div>
      </div>
    </nav>
  );
}
