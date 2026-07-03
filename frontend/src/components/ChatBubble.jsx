/**
 * ChatBubble.jsx - Individual Chat Message Bubble
 * 
 * Renders a single chat message with:
 * - User and bot avatar icons
 * - Styled message bubbles (user: gradient, bot: glass)
 * - Markdown rendering for bot messages
 * - Timestamp display
 * - Expandable NLP details panel (intent, confidence, processing steps)
 * - Confidence score visualization bar
 */

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { FiChevronDown, FiChevronUp, FiCpu, FiTarget, FiActivity } from 'react-icons/fi';

/**
 * Format ISO timestamp to readable time string.
 */
function formatTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/**
 * Returns a color class based on confidence percentage.
 */
function getConfidenceColor(confidence) {
  if (confidence >= 80) return 'bg-green-500';
  if (confidence >= 50) return 'bg-yellow-500';
  return 'bg-red-500';
}

/**
 * Returns a label for confidence level.
 */
function getConfidenceLabel(confidence) {
  if (confidence >= 80) return 'High';
  if (confidence >= 50) return 'Medium';
  return 'Low';
}

export default function ChatBubble({ message, isLast }) {
  const { role, content, timestamp, intent, confidence, processed_text, nlp_steps } = message;
  
  // State to show/hide the NLP details panel
  const [showDetails, setShowDetails] = useState(false);

  const isUser = role === 'user';
  const isBot = role === 'bot';
  const hasNLPDetails = isBot && intent && intent !== 'greeting' && intent !== 'error' && confidence > 0;

  return (
    <div className={`flex items-end gap-3 message-enter ${isUser ? 'flex-row-reverse' : ''}`}>

      {/* ─── Avatar ─── */}
      <div className={`
        flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-base shadow-md
        ${isUser
          ? 'bg-gradient-to-br from-blue-500 to-primary-600 text-white'
          : 'gradient-primary text-white shadow-glow'
        }
      `}>
        {isUser ? '👤' : '🤖'}
      </div>

      {/* ─── Message Content ─── */}
      <div className={`max-w-[75%] sm:max-w-[65%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-1`}>

        {/* Bubble */}
        <div className={`
          relative px-4 py-3 text-sm leading-relaxed
          ${isUser
            ? 'bubble-user text-white'
            : 'bubble-bot text-gray-800 dark:text-gray-100'
          }
        `}>
          {isUser ? (
            // User messages: plain text
            <p className="whitespace-pre-wrap">{content}</p>
          ) : (
            // Bot messages: render markdown
            <div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-1 prose-ul:my-1 prose-li:my-0.5">
              <ReactMarkdown
                components={{
                  // Style inline code
                  code: ({ children }) => (
                    <code className="px-1.5 py-0.5 rounded text-xs font-mono bg-black/10 dark:bg-white/10">
                      {children}
                    </code>
                  ),
                  // Style code blocks
                  pre: ({ children }) => (
                    <pre className="p-3 rounded-lg bg-black/10 dark:bg-white/5 overflow-x-auto text-xs">
                      {children}
                    </pre>
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* ─── Timestamp ─── */}
        <div className={`flex items-center gap-2 px-1 ${isUser ? 'flex-row-reverse' : ''}`}>
          <span className="text-xs text-gray-400 dark:text-gray-600">
            {formatTime(timestamp)}
          </span>
          
          {/* NLP Details toggle button (bot messages only) */}
          {hasNLPDetails && (
            <button
              onClick={() => setShowDetails(prev => !prev)}
              className="flex items-center gap-1 text-xs text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 transition-colors duration-150 font-medium"
              aria-label="Show NLP analysis details"
            >
              <FiCpu className="text-xs" />
              NLP Details
              {showDetails ? <FiChevronUp className="text-xs" /> : <FiChevronDown className="text-xs" />}
            </button>
          )}
        </div>

        {/* ─── NLP Details Panel ─── */}
        {hasNLPDetails && showDetails && (
          <div className="w-full glass rounded-xl p-4 border border-primary-200/50 dark:border-primary-500/20 space-y-3 message-enter">

            {/* Intent */}
            <div className="flex items-center gap-2">
              <FiTarget className="text-primary-500 flex-shrink-0" />
              <div className="flex-1">
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Detected Intent:
                </span>
                <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-bold bg-primary-100 dark:bg-primary-500/20 text-primary-700 dark:text-primary-300">
                  {intent}
                </span>
              </div>
            </div>

            {/* Confidence Score */}
            {confidence > 0 && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <FiActivity className="text-primary-500 flex-shrink-0" />
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      Confidence:
                    </span>
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    confidence >= 80
                      ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400'
                      : confidence >= 50
                      ? 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400'
                      : 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400'
                  }`}>
                    {confidence}% · {getConfidenceLabel(confidence)}
                  </span>
                </div>
                {/* Confidence bar */}
                <div className="h-1.5 w-full bg-gray-200 dark:bg-dark-600 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getConfidenceColor(confidence)} confidence-bar rounded-full transition-all duration-1000`}
                    style={{ width: `${confidence}%` }}
                  />
                </div>
              </div>
            )}

            {/* Processed Text */}
            {processed_text && (
              <div>
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 block mb-1">
                  🔤 After NLP Processing:
                </span>
                <code className="processed-text block">
                  {processed_text || '(empty after processing)'}
                </code>
              </div>
            )}

            {/* NLP Steps */}
            {nlp_steps && nlp_steps.length > 0 && (
              <div>
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 block mb-2">
                  ⚙️ Processing Steps:
                </span>
                <div className="space-y-2">
                  {nlp_steps.map((step, i) => (
                    <div
                      key={step.step}
                      className="flex items-start gap-2 p-2 rounded-lg bg-gray-50 dark:bg-dark-700/50"
                    >
                      {/* Step number */}
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 text-xs font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <div className="min-w-0">
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                          {step.step}:
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-500 ml-1.5 font-mono">
                          {Array.isArray(step.result)
                            ? `[${step.result.slice(0, 5).join(', ')}${step.result.length > 5 ? '...' : ''}]`
                            : step.result
                          }
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
