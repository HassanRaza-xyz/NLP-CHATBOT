/**
 * HomePage.jsx - Landing Page Component
 * 
 * Aggregates all landing page sections:
 * Hero → About → Features
 * Footer is rendered by App.jsx outside this component.
 */

import React from 'react';
import Hero from './Hero';
import About from './About';
import Features from './Features';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Features />
    </>
  );
}
