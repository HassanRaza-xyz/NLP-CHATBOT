/**
 * About.jsx - About Section Component
 * 
 * Explains the project, technologies, and NLP pipeline.
 * Includes:
 * - Project description
 * - Tech stack cards
 * - NLP pipeline visualization (step-by-step)
 * - Architecture highlights
 */

import React from 'react';
import { FiCpu, FiCode, FiDatabase, FiGrid, FiZap, FiArrowRight } from 'react-icons/fi';

// Technology stack used in the project
const TECH_STACK = [
  {
    icon: '🐍',
    name: 'Python Flask',
    description: 'REST API backend with CORS support. Handles chat requests, history, and model inference.',
    color: 'from-green-500/10 to-emerald-500/10 border-green-500/20',
    badge: 'Backend',
    badgeColor: 'bg-green-500/20 text-green-400',
  },
  {
    icon: '⚛️',
    name: 'React.js',
    description: 'Modern frontend with hooks, context API, React Router, and Framer Motion animations.',
    color: 'from-blue-500/10 to-cyan-500/10 border-blue-500/20',
    badge: 'Frontend',
    badgeColor: 'bg-blue-500/20 text-blue-400',
  },
  {
    icon: '🔤',
    name: 'NLTK',
    description: 'Natural Language Toolkit for tokenization, stopword removal, and WordNet lemmatization.',
    color: 'from-purple-500/10 to-violet-500/10 border-purple-500/20',
    badge: 'NLP',
    badgeColor: 'bg-purple-500/20 text-purple-400',
  },
  {
    icon: '📊',
    name: 'TF-IDF + LR',
    description: 'TF-IDF vectorization for feature extraction and Logistic Regression for intent classification.',
    color: 'from-indigo-500/10 to-primary-500/10 border-indigo-500/20',
    badge: 'ML',
    badgeColor: 'bg-indigo-500/20 text-indigo-400',
  },
];

// NLP preprocessing pipeline steps
const NLP_PIPELINE = [
  {
    step: '01',
    name: 'Input Text',
    description: 'User sends a raw text message to the chatbot.',
    example: '"How do I apply for admission?"',
    icon: '💬',
  },
  {
    step: '02',
    name: 'Tokenization',
    description: 'Text is split into individual word tokens using NLTK\'s word_tokenize().',
    example: '["How", "do", "I", "apply", "for", "admission", "?"]',
    icon: '🔪',
  },
  {
    step: '03',
    name: 'Stopword Removal',
    description: 'Common words with little meaning (the, is, a, for) are removed.',
    example: '["apply", "admission"]',
    icon: '🗑️',
  },
  {
    step: '04',
    name: 'Lemmatization',
    description: 'Tokens are converted to their base dictionary form.',
    example: '["apply", "admission"]  →  same in this case',
    icon: '📖',
  },
  {
    step: '05',
    name: 'TF-IDF Vectorization',
    description: 'Processed text is converted to a numerical feature vector.',
    example: '[0.0, 0.82, 0.0, 0.57, ...]  (sparse vector)',
    icon: '🔢',
  },
  {
    step: '06',
    name: 'Intent Classification',
    description: 'Logistic Regression predicts the most probable intent with confidence score.',
    example: 'Intent: "university_admission"  |  Confidence: 94.2%',
    icon: '🎯',
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="py-24 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-primary-50/20 dark:from-dark-900 dark:to-dark-800" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ─── Section Header ─── */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm font-semibold mb-6">
            <FiCode />
            About This Project
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-6">
            Built with{' '}
            <span className="gradient-text">Real NLP</span>
            {' '}Techniques
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            This project demonstrates core Natural Language Processing concepts through a practical 
            conversational AI system. It combines classical ML techniques with a modern web interface 
            to create an engaging and educational chatbot experience.
          </p>
        </div>

        {/* ─── Tech Stack Cards ─── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {TECH_STACK.map((tech) => (
            <div
              key={tech.name}
              className={`
                feature-card glass rounded-2xl p-6 border
                bg-gradient-to-br ${tech.color}
              `}
            >
              <div className="text-4xl mb-4">{tech.icon}</div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-bold text-gray-900 dark:text-white">{tech.name}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tech.badgeColor}`}>
                  {tech.badge}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {tech.description}
              </p>
            </div>
          ))}
        </div>

        {/* ─── NLP Pipeline Visualization ─── */}
        <div>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 text-sm font-semibold mb-4">
              <FiGrid />
              NLP Processing Pipeline
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              From Raw Text to Intent
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-2xl mx-auto">
              Every message goes through 6 stages of NLP processing before a response is generated.
            </p>
          </div>

          {/* Pipeline Steps Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {NLP_PIPELINE.map((step, i) => (
              <div
                key={step.step}
                className="relative glass rounded-2xl p-6 border border-primary-100/50 dark:border-primary-500/15 hover:border-primary-300 dark:hover:border-primary-500/40 transition-all duration-300 group"
              >
                {/* Step number */}
                <div className="absolute top-4 right-4 text-4xl font-black text-gray-100 dark:text-dark-700 select-none group-hover:text-primary-100 dark:group-hover:text-primary-900 transition-colors">
                  {step.step}
                </div>

                {/* Icon */}
                <div className="text-3xl mb-3">{step.icon}</div>

                {/* Name */}
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-sm">
                  {step.name}
                </h4>

                {/* Description */}
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
                  {step.description}
                </p>

                {/* Example output */}
                <div className="processed-text">
                  {step.example}
                </div>

                {/* Arrow to next step (not on last) */}
                {i < NLP_PIPELINE.length - 1 && (
                  <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                    {/* Arrow only shows horizontally in 3-col layout */}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
