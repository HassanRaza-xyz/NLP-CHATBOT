/**
 * Footer.jsx - Site Footer Component
 * 
 * Features:
 * - Project info and links
 * - NLP technologies list
 * - Copyright notice
 * - Social/attribution links
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { FiZap, FiGithub, FiMail, FiHeart } from 'react-icons/fi';

const FOOTER_LINKS = [
  { label: 'Home',     action: 'scroll', target: 'home' },
  { label: 'About',    action: 'scroll', target: 'about' },
  { label: 'Features', action: 'scroll', target: 'features' },
  { label: 'Chat',     action: 'link',   to: '/chat' },
];

const NLP_TOOLS = [
  'NLTK', 'Tokenization', 'Lemmatization',
  'Stopword Removal', 'TF-IDF', 'Logistic Regression',
  'Intent Recognition', 'Scikit-learn'
];

export default function Footer() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-gray-200/50 dark:border-primary-500/10 bg-gray-50 dark:bg-dark-900 py-16">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* ─── Brand Column ─── */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
                <FiZap className="text-white text-lg" />
              </div>
              <span className="font-bold text-lg text-gray-900 dark:text-white">
                Smart<span className="gradient-text">NLP</span> Bot
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
              An intelligent university chatbot project demonstrating Natural Language Processing 
              techniques including tokenization, lemmatization, TF-IDF, and logistic regression.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-gray-200 dark:bg-dark-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-500/10 transition-all duration-200"
                aria-label="GitHub"
              >
                <FiGithub />
              </a>
              <a
                href="mailto:student@university.edu"
                className="w-9 h-9 rounded-lg bg-gray-200 dark:bg-dark-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-500/10 transition-all duration-200"
                aria-label="Email"
              >
                <FiMail />
              </a>
            </div>
          </div>

          {/* ─── Quick Links ─── */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-5 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.map(({ label, action, target, to }) => (
                <li key={label}>
                  {action === 'scroll' ? (
                    <button
                      onClick={() => scrollToSection(target)}
                      className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                    >
                      {label}
                    </button>
                  ) : (
                    <Link
                      to={to}
                      className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* ─── Technologies ─── */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-5 text-sm uppercase tracking-wider">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {NLP_TOOLS.map(tool => (
                <span
                  key={tool}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-primary-100 dark:bg-primary-500/10 text-primary-700 dark:text-primary-400 border border-primary-200/50 dark:border-primary-500/20"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* ─── Bottom Bar ─── */}
        <div className="pt-8 border-t border-gray-200/50 dark:border-primary-500/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            © {new Date().getFullYear()} Smart NLP Chatbot · University NLP Project
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
            Built with{' '}
            <FiHeart className="text-red-400" />
            {' '}using React, Flask & NLTK
          </p>
        </div>
      </div>
    </footer>
  );
}
