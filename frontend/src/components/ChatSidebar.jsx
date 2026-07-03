/**
 * ChatSidebar.jsx - Chat Sidebar / History Panel
 * 
 * Features:
 * - Shows all messages in the current session
 * - Grouped display with user/bot indicators
 * - Clear Chat button
 * - Session ID display
 * - Scrollable message list
 * - Stats about the conversation
 */

import React, { useMemo } from 'react';
import { FiTrash2, FiX, FiMessageSquare, FiCpu, FiHash, FiUser } from 'react-icons/fi';

/**
 * Formats an ISO timestamp to a readable time string.
 */
function formatTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/**
 * Formats a short date string.
 */
function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

export default function ChatSidebar({ messages, onClearChat, onClose, sessionId }) {
  // Separate user from bot messages for stats
  const stats = useMemo(() => ({
    total: messages.length,
    userMessages: messages.filter(m => m.role === 'user').length,
    botMessages: messages.filter(m => m.role === 'bot').length,
  }), [messages]);

  // Short session ID for display
  const shortSessionId = sessionId?.slice(0, 8).toUpperCase();

  return (
    <aside className="w-72 h-full glass border-r border-gray-200/50 dark:border-primary-500/15 flex flex-col">

      {/* ─── Sidebar Header ─── */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200/50 dark:border-primary-500/15">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <FiMessageSquare className="text-white text-sm" />
          </div>
          <div>
            <div className="font-bold text-sm text-gray-900 dark:text-white">Chat History</div>
            <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
              <FiHash className="text-xs" />
              {shortSessionId}
            </div>
          </div>
        </div>

        {/* Close button (mobile only) */}
        <button
          onClick={onClose}
          className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-400 dark:text-gray-500 transition-colors"
          aria-label="Close sidebar"
        >
          <FiX />
        </button>
      </div>

      {/* ─── Stats Bar ─── */}
      <div className="grid grid-cols-3 gap-2 p-4 border-b border-gray-200/50 dark:border-primary-500/15">
        <div className="text-center">
          <div className="text-lg font-black gradient-text">{stats.total}</div>
          <div className="text-xs text-gray-400 dark:text-gray-500">Total</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-black text-blue-500">{stats.userMessages}</div>
          <div className="text-xs text-gray-400 dark:text-gray-500">You</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-black text-green-500">{stats.botMessages}</div>
          <div className="text-xs text-gray-400 dark:text-gray-500">Bot</div>
        </div>
      </div>

      {/* ─── Message History List ─── */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 dark:text-gray-600 text-xs py-8">
            No messages yet
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`
                sidebar-item flex items-start gap-2.5 p-3 rounded-xl 
                border border-transparent
                ${msg.role === 'user'
                  ? 'hover:bg-blue-50/60 dark:hover:bg-blue-500/5'
                  : 'hover:bg-green-50/60 dark:hover:bg-green-500/5'
                }
              `}
            >
              {/* Avatar icon */}
              <div className={`
                flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs mt-0.5
                ${msg.role === 'user'
                  ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400'
                  : 'gradient-primary text-white'
                }
              `}>
                {msg.role === 'user' ? <FiUser className="text-xs" /> : <FiCpu className="text-xs" />}
              </div>

              {/* Message content */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-500">
                    {msg.role === 'user' ? 'You' : 'Bot'}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-600">
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 truncate leading-relaxed">
                  {/* Strip markdown for sidebar preview */}
                  {msg.content.replace(/\*\*/g, '').replace(/\n/g, ' ').slice(0, 60)}
                  {msg.content.length > 60 ? '...' : ''}
                </p>
                
                {/* Show intent tag for bot messages */}
                {msg.role === 'bot' && msg.intent && msg.intent !== 'greeting' && msg.intent !== 'error' && (
                  <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-xs bg-primary-100 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400">
                    {msg.intent}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* ─── Clear Chat Button ─── */}
      <div className="p-4 border-t border-gray-200/50 dark:border-primary-500/15">
        <button
          id="clear-chat-sidebar-btn"
          onClick={onClearChat}
          disabled={messages.length === 0}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
            text-red-500 dark:text-red-400
            border border-red-200 dark:border-red-500/20
            hover:bg-red-50 dark:hover:bg-red-500/10
            disabled:opacity-40 disabled:cursor-not-allowed
            transition-all duration-200"
        >
          <FiTrash2 />
          Clear Chat History
        </button>
        
        {/* Session info */}
        <p className="text-center text-xs text-gray-400 dark:text-gray-600 mt-2">
          Session: {shortSessionId}
        </p>
      </div>
    </aside>
  );
}
