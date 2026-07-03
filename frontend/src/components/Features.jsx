/**
 * Features.jsx - Features Section Component
 * 
 * Showcases all chatbot and NLP features with animated cards.
 * Organized into two groups:
 * - Chatbot UI features
 * - NLP/AI features
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiMessageSquare, FiMoon, FiSmartphone, FiClock,
  FiTrash2, FiList, FiUser, FiBarChart2,
  FiZap, FiLayers, FiTarget, FiActivity
} from 'react-icons/fi';

// Chatbot UI features
const UI_FEATURES = [
  {
    icon: FiMessageSquare,
    title: 'Chat Bubbles',
    description: 'Distinct user and bot bubbles with smooth entrance animations and timestamps.',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    icon: FiActivity,
    title: 'Typing Animation',
    description: 'Animated typing indicator shows while the bot processes your message.',
    color: 'text-green-500',
    bg: 'bg-green-500/10',
  },
  {
    icon: FiMoon,
    title: 'Dark / Light Mode',
    description: 'Toggle between dark and light themes. Preference is saved automatically.',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
  {
    icon: FiList,
    title: 'Chat Sidebar',
    description: 'Sidebar panel shows the full conversation history with timestamps.',
    color: 'text-indigo-500',
    bg: 'bg-indigo-500/10',
  },
  {
    icon: FiTrash2,
    title: 'Clear Chat',
    description: 'Instantly clear the chat window and start a fresh conversation.',
    color: 'text-red-500',
    bg: 'bg-red-500/10',
  },
  {
    icon: FiSmartphone,
    title: 'Mobile Responsive',
    description: 'Fully responsive design that works beautifully on all screen sizes.',
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
  },
  {
    icon: FiUser,
    title: 'User & Bot Avatars',
    description: 'Distinct avatar icons for the user and the AI bot in every message.',
    color: 'text-cyan-500',
    bg: 'bg-cyan-500/10',
  },
  {
    icon: FiClock,
    title: 'Timestamps',
    description: 'Each message is timestamped so you can track the conversation flow.',
    color: 'text-pink-500',
    bg: 'bg-pink-500/10',
  },
];

// NLP/AI features
const NLP_FEATURES = [
  {
    icon: FiLayers,
    title: 'Tokenization',
    description: 'NLTK\'s word_tokenize() splits input into individual word tokens for processing.',
    color: 'text-violet-500',
    bg: 'bg-violet-500/10',
  },
  {
    icon: FiZap,
    title: 'Stopword Removal',
    description: 'Filter out common words like "the", "is", "at" that add noise but little meaning.',
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10',
  },
  {
    icon: FiTarget,
    title: 'Lemmatization',
    description: 'WordNetLemmatizer converts words to their base form for better pattern matching.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
  },
  {
    icon: FiBarChart2,
    title: 'Confidence Score',
    description: 'Each prediction shows a confidence percentage so you know how certain the bot is.',
    color: 'text-primary-500',
    bg: 'bg-primary-500/10',
  },
];

/**
 * Individual feature card component.
 */
function FeatureCard({ icon: Icon, title, description, color, bg }) {
  return (
    <div className="feature-card glass rounded-2xl p-6 border border-gray-100/50 dark:border-primary-500/10 hover:border-primary-300/50 dark:hover:border-primary-500/30 group cursor-default">
      {/* Icon container */}
      <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
        <Icon className={`text-xl ${color}`} />
      </div>
      
      {/* Title */}
      <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default function Features() {
  return (
    <section
      id="features"
      className="py-24 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-50/20 to-white dark:from-dark-800 dark:to-dark-900" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ─── Section Header ─── */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm font-semibold mb-6">
            <FiZap />
            Features
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-6">
            Everything You Need in a{' '}
            <span className="gradient-text">Smart Chatbot</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A complete feature set combining modern UI design with powerful NLP capabilities 
            — all built from scratch for this university project.
          </p>
        </div>

        {/* ─── UI Features Grid ─── */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-white text-sm">
              <FiMessageSquare />
            </span>
            Chatbot UI Features
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {UI_FEATURES.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>

        {/* ─── NLP Features ─── */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-sm">
              <FiActivity />
            </span>
            NLP & AI Features
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {NLP_FEATURES.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>

        {/* ─── CTA Banner ─── */}
        <div className="relative mt-8 rounded-3xl overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 gradient-animated opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600/90 to-accent-600/90" />
          
          {/* Decorative circles */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-white/5" />

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between p-10 gap-6">
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
                Ready to experience NLP?
              </h3>
              <p className="text-white/80 text-base">
                Jump into a live conversation and see all the NLP features in action!
              </p>
            </div>
            <Link
              to="/chat"
              id="features-chat-btn"
              className="flex-shrink-0 flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-primary-600 font-bold hover:bg-white/90 hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <FiMessageSquare />
              Try the Chatbot
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
