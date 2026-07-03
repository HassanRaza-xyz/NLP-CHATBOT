/**
 * ChatWindow.jsx - Main Chat Interface
 * 
 * Features:
 * - Chat header with bot status
 * - Scrollable message area
 * - Typing indicator animation
 * - Auto-scroll to bottom
 * - Quick reply suggestion chips
 * - Message input area with send button
 * - Keyboard shortcut: Enter to send
 */

import React, { useRef, useEffect } from 'react';
import {
  FiSend, FiTrash2, FiMenu, FiCpu, FiMessageSquare
} from 'react-icons/fi';
import ChatBubble from './ChatBubble';

// Quick reply suggestion chips for easy interaction
const QUICK_REPLIES = [
  '👋 Say Hello',
  '🎓 Admission Info',
  '🧠 What is NLP?',
  '📚 What is TF-IDF?',
  '😂 Tell me a joke',
  '💰 What are the fees?',
];

export default function ChatWindow({
  messages,
  isTyping,
  inputText,
  onInputChange,
  onSendMessage,
  onClearChat,
  onToggleSidebar,
  sidebarOpen,
}) {
  // Reference to the bottom of the messages list (for auto-scroll)
  const endRef = useRef(null);
  
  // Reference to the textarea input
  const inputRef = useRef(null);
  
  // Whether we've shown at least one user message
  const hasUserMessages = messages.some(m => m.role === 'user');

  // Auto-scroll to bottom when messages change or typing state changes
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  /**
   * Handle keyboard input: Enter sends (with Shift+Enter for newline).
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage(inputText);
    }
  };

  /**
   * Handle a quick reply chip click.
   */
  const handleQuickReply = (text) => {
    // Strip emoji prefix for the actual message
    const cleaned = text.replace(/^[^\s]+ /, '');
    onSendMessage(cleaned);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 h-full">

      {/* ─── Chat Header ─── */}
      <div className="glass border-b border-gray-200/50 dark:border-primary-500/15 px-4 py-3 flex items-center gap-3 flex-shrink-0">
        
        {/* Mobile sidebar toggle */}
        <button
          id="sidebar-toggle-btn"
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-500 dark:text-gray-400 transition-colors"
          aria-label="Toggle chat sidebar"
        >
          <FiMenu className="text-lg" />
        </button>

        {/* Bot Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow text-xl">
            🤖
          </div>
          {/* Online indicator */}
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-dark-900 animate-pulse" />
        </div>

        {/* Bot Info */}
        <div className="flex-1 min-w-0">
          <h1 className="font-bold text-gray-900 dark:text-white text-sm">Smart NLP Bot</h1>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <FiCpu className="text-primary-500 text-xs" />
            <span>Powered by NLTK + Logistic Regression</span>
          </div>
        </div>

        {/* Message count badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-100/80 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-medium">
          <FiMessageSquare className="text-xs" />
          {messages.length} msg{messages.length !== 1 ? 's' : ''}
        </div>

        {/* Clear chat button (header) */}
        <button
          id="clear-chat-header-btn"
          onClick={onClearChat}
          className="p-2 rounded-lg text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200"
          title="Clear chat"
          aria-label="Clear chat history"
        >
          <FiTrash2 className="text-base" />
        </button>
      </div>

      {/* ─── Messages Area ─── */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">

        {/* Messages */}
        {messages.map((message, index) => (
          <ChatBubble
            key={message.id}
            message={message}
            isLast={index === messages.length - 1}
          />
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-end gap-3 message-enter">
            {/* Bot avatar */}
            <div className="flex-shrink-0 w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-sm shadow-glow">
              🤖
            </div>

            {/* Typing dots bubble */}
            <div className="bubble-bot px-5 py-4">
              <div className="flex items-center gap-1.5">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            </div>
          </div>
        )}

        {/* Scroll anchor */}
        <div ref={endRef} />
      </div>

      {/* ─── Quick Reply Chips ─── */}
      {!hasUserMessages && (
        <div className="px-4 pb-3 flex flex-wrap gap-2 flex-shrink-0">
          <span className="text-xs text-gray-400 dark:text-gray-500 self-center mr-1 font-medium">
            Try asking:
          </span>
          {QUICK_REPLIES.map((reply) => (
            <button
              key={reply}
              onClick={() => handleQuickReply(reply)}
              className="px-3 py-1.5 rounded-full text-xs font-medium glass border border-gray-200/50 dark:border-primary-500/20 text-gray-600 dark:text-gray-300 hover:border-primary-400 dark:hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-all duration-200"
            >
              {reply}
            </button>
          ))}
        </div>
      )}

      {/* ─── Input Area ─── */}
      <div className="flex-shrink-0 p-4 border-t border-gray-200/50 dark:border-primary-500/15 glass">
        <div className="flex items-end gap-3 max-w-4xl mx-auto">
          
          {/* User Avatar in input area */}
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-primary-600 flex items-center justify-center text-white text-sm mb-1">
            👤
          </div>

          {/* Text Input */}
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              id="chat-input"
              value={inputText}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message... (Press Enter to send)"
              disabled={isTyping}
              rows={1}
              className="
                w-full px-4 py-3 rounded-2xl resize-none
                bg-gray-100 dark:bg-dark-700
                border border-gray-200 dark:border-primary-500/20
                text-gray-900 dark:text-gray-100
                placeholder-gray-400 dark:placeholder-gray-600
                text-sm leading-relaxed
                focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-400
                disabled:opacity-60 disabled:cursor-not-allowed
                transition-all duration-200
                max-h-32 overflow-y-auto
              "
              style={{
                // Auto-resize textarea
                height: 'auto',
                minHeight: '48px',
              }}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
              }}
            />
          </div>

          {/* Send Button */}
          <button
            id="send-message-btn"
            onClick={() => onSendMessage(inputText)}
            disabled={!inputText.trim() || isTyping}
            className="
              flex-shrink-0 w-12 h-12 rounded-2xl
              gradient-primary text-white
              flex items-center justify-center
              shadow-glow hover:shadow-glow-lg
              hover:scale-105 active:scale-95
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
              transition-all duration-200
            "
            aria-label="Send message"
          >
            <FiSend className="text-base translate-x-0.5 -translate-y-0.5" />
          </button>
        </div>

        {/* Footer hint */}
        <p className="text-center text-xs text-gray-400 dark:text-gray-600 mt-2">
          Press <kbd className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-dark-600 text-gray-600 dark:text-gray-400 text-xs font-mono">Enter</kbd> to send · <kbd className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-dark-600 text-gray-600 dark:text-gray-400 text-xs font-mono">Shift + Enter</kbd> for new line
        </p>
      </div>
    </div>
  );
}
