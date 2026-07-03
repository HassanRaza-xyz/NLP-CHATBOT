/**
 * Hero.jsx - Landing Page Hero Section
 * 
 * Features:
 * - Animated gradient background with floating orbs
 * - Headline with gradient text effect
 * - Animated NLP tech tags
 * - Live statistic counters
 * - CTA buttons with hover effects
 * - Floating chat preview card
 * - Smooth entrance animations
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMessageSquare, FiArrowDown, FiZap, FiCpu, FiLayers } from 'react-icons/fi';

// NLP tech tags to display in the hero
const NLP_TAGS = [
  { label: 'Tokenization',  color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
  { label: 'Lemmatization', color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
  { label: 'TF-IDF',        color: 'bg-violet-500/20 text-violet-300 border-violet-500/30' },
  { label: 'Logistic Regression', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  { label: 'NLTK',          color: 'bg-pink-500/20 text-pink-300 border-pink-500/30' },
  { label: 'Intent Detection', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
];

// Stats displayed in the hero
const STATS = [
  { value: '25+',  label: 'Intent Classes' },
  { value: '200+', label: 'Training Patterns' },
  { value: '5',    label: 'NLP Techniques' },
  { value: '99%',  label: 'Uptime' },
];

// Sample chat messages for the floating preview card
const PREVIEW_MESSAGES = [
  { role: 'user', text: 'What is NLP?' },
  { role: 'bot',  text: 'NLP (Natural Language Processing) is a branch of AI that helps computers understand and process human language!' },
  { role: 'user', text: 'How do I apply for admission?' },
  { role: 'bot',  text: 'For university admission, submit your application online with academic transcripts and required documents!' },
];

export default function Hero() {
  // Animate the preview messages sequentially
  const [visibleMessages, setVisibleMessages] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleMessages(prev => {
        if (prev < PREVIEW_MESSAGES.length) return prev + 1;
        clearInterval(timer);
        return prev;
      });
    }, 800);
    return () => clearInterval(timer);
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* ─── Animated Background ─── */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-primary-50/30 to-accent-400/10 dark:from-dark-900 dark:via-dark-800 dark:to-dark-700" />
      
      {/* Floating gradient orbs */}
      <div className="orb orb-1 dark:opacity-15 opacity-5" />
      <div className="orb orb-2 dark:opacity-15 opacity-5" />
      <div className="orb orb-3 dark:opacity-10 opacity-5" />

      {/* Animated grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* ─── Hero Content ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ─── Left Column: Text Content ─── */}
          <div className="text-center lg:text-left">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary-200/50 dark:border-primary-500/30 text-primary-600 dark:text-primary-400 text-sm font-medium mb-8 animate-fade-in-up">
              <FiZap className="text-yellow-500" />
              University NLP Project 2024
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight text-gray-900 dark:text-white mb-6 animate-fade-in-up">
              Meet Your{' '}
              <span className="gradient-text">Smart NLP</span>
              <br />
              <span className="gradient-text">Chatbot</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in-up leading-relaxed">
              An intelligent conversational AI built with{' '}
              <span className="text-primary-600 dark:text-primary-400 font-semibold">NLTK</span>,{' '}
              <span className="text-primary-600 dark:text-primary-400 font-semibold">TF-IDF</span>, and{' '}
              <span className="text-primary-600 dark:text-primary-400 font-semibold">Logistic Regression</span>{' '}
              — answering university FAQs and explaining NLP concepts!
            </p>

            {/* NLP Tech Tags */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-10">
              {NLP_TAGS.map((tag, i) => (
                <span
                  key={tag.label}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${tag.color} animate-fade-in-up`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {tag.label}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/chat"
                id="hero-chat-btn"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl gradient-primary text-white font-semibold text-base shadow-glow hover:shadow-glow-lg hover:scale-105 btn-glow transition-all duration-300"
              >
                <FiMessageSquare className="text-lg" />
                Start Chatting Now
              </Link>

              <button
                onClick={scrollToAbout}
                id="hero-learn-btn"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl glass border border-primary-200/50 dark:border-primary-500/20 text-gray-700 dark:text-gray-300 font-semibold text-base hover:bg-primary-50 dark:hover:bg-primary-500/10 hover:scale-105 transition-all duration-300"
              >
                <FiLayers className="text-lg" />
                Explore Features
              </button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-4 mt-12 pt-8 border-t border-gray-200/50 dark:border-primary-500/15">
              {STATS.map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-xl sm:text-2xl font-black gradient-text">{value}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ─── Right Column: Chat Preview Card ─── */}
          <div className="hidden lg:flex justify-center">
            <div className="w-96 glass-elevated rounded-3xl overflow-hidden shadow-glass border border-white/20 dark:border-primary-500/20 animate-float">
              
              {/* Card Header */}
              <div className="gradient-primary p-4 flex items-center gap-3">
                {/* Bot avatar */}
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white text-lg">
                  🤖
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">Smart NLP Bot</div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-white/70 text-xs">Online</span>
                  </div>
                </div>
                <div className="ml-auto">
                  <FiCpu className="text-white/60 text-xl" />
                </div>
              </div>

              {/* Chat Messages Preview */}
              <div className="p-4 space-y-4 bg-white/50 dark:bg-dark-800/50 min-h-64">
                {PREVIEW_MESSAGES.slice(0, visibleMessages).map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-2 items-end message-enter ${
                      msg.role === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    {/* Avatar */}
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${
                      msg.role === 'user'
                        ? 'gradient-primary text-white'
                        : 'bg-gray-200 dark:bg-dark-600'
                    }`}>
                      {msg.role === 'user' ? '👤' : '🤖'}
                    </div>

                    {/* Bubble */}
                    <div className={`max-w-[75%] px-3.5 py-2.5 text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bubble-user'
                        : 'bubble-bot text-gray-800 dark:text-gray-100'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}

                {/* Typing indicator shows when bot is about to respond */}
                {visibleMessages % 2 === 1 && visibleMessages < PREVIEW_MESSAGES.length && (
                  <div className="flex gap-2 items-end">
                    <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-dark-600 flex items-center justify-center text-sm">🤖</div>
                    <div className="bubble-bot px-4 py-3">
                      <div className="flex gap-1.5">
                        <span className="typing-dot" />
                        <span className="typing-dot" />
                        <span className="typing-dot" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer - Input preview */}
              <div className="p-3 border-t border-gray-200/50 dark:border-primary-500/20 bg-white/30 dark:bg-dark-700/30">
                <div className="flex gap-2">
                  <div className="flex-1 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-600 text-xs text-gray-400 dark:text-gray-500">
                    Ask me anything...
                  </div>
                  <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center text-white text-sm">
                    ↑
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ─── Scroll Down Indicator ─── */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 dark:text-gray-600 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200 animate-bounce"
        aria-label="Scroll to About section"
      >
        <span className="text-xs font-medium">Scroll to explore</span>
        <FiArrowDown className="text-lg" />
      </button>
    </section>
  );
}
