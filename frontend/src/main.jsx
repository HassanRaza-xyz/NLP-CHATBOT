/**
 * main.jsx - React Application Entry Point
 * 
 * Renders the root React component tree into the DOM.
 * Wraps the app with ThemeProvider for dark/light mode support.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './context/ThemeContext';
import App from './App.jsx';
import './index.css';   // Import global styles

// Mount React app to the #root div in index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* ThemeProvider must wrap everything for dark/light mode */}
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
