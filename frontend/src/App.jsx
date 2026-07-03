/**
 * App.jsx - Root Application Component
 * 
 * Sets up React Router for navigation between:
 * - Home page (Landing page with Hero, Features, About, Footer)
 * - Chat page (Full chatbot interface)
 * 
 * The Navbar is always visible across all routes.
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ChatPage from './components/ChatPage';
import Footer from './components/Footer';

/**
 * App component — defines the routing structure.
 */
export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white dark:bg-dark-900 transition-colors duration-300">
        {/* Always-visible navigation */}
        <Navbar />
        
        {/* Main content area with routing */}
        <main className="flex-1">
          <Routes>
            {/* Home route: landing page with all sections */}
            <Route path="/" element={<HomePage />} />
            
            {/* Chat route: full-screen chatbot interface */}
            <Route path="/chat" element={<ChatPage />} />
          </Routes>
        </main>

        {/* Footer only on home page — ChatPage has its own layout */}
        <Routes>
          <Route path="/" element={<Footer />} />
        </Routes>
      </div>
    </Router>
  );
}
