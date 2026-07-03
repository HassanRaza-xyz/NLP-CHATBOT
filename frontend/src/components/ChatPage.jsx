/**
 * ChatPage.jsx - Full Chatbot Interface Page
 * 
 * Layout:
 * ┌─────────────────┬────────────────────────────────────┐
 * │   ChatSidebar   │         ChatWindow                 │
 * │  (history list) │  (messages + input bar)            │
 * └─────────────────┴────────────────────────────────────┘
 * 
 * Features:
 * - Manages all chat state (messages, input, loading)
 * - Communicates with Flask backend API
 * - Session ID management
 * - Clear chat functionality
 * - Responsive: sidebar collapses on mobile
 */

import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';

// Flask API base URL (proxied via Vite to localhost:5000)
const API_BASE = '/api';

/**
 * Creates a new message object.
 */
function createMessage(role, content, meta = {}) {
  return {
    id: uuidv4(),
    role,         // 'user' | 'bot'
    content,
    timestamp: new Date().toISOString(),
    ...meta
  };
}

// Initial greeting message from the bot
const INITIAL_MESSAGE = createMessage(
  'bot',
  "👋 Hello! I'm **Smart NLP Bot**, your AI-powered assistant!\n\nI can help you with:\n- 🎓 **University FAQs** (admission, courses, fees)\n- 🧠 **NLP Concepts** (tokenization, lemmatization, TF-IDF)\n- 💬 **General Conversation** (greetings, jokes, and more!)\n\nTry asking: *\"What is tokenization?\"* or *\"How do I apply for admission?\"*",
  { intent: 'greeting', confidence: 100 }
);

export default function ChatPage() {
  // All chat messages in the current conversation
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  
  // Whether the bot is currently processing (shows typing indicator)
  const [isTyping, setIsTyping] = useState(false);
  
  // Current text in the input field
  const [inputText, setInputText] = useState('');
  
  // Session ID to track conversation history on backend
  const [sessionId] = useState(() => uuidv4());
  
  // Sidebar visibility on mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /**
   * Send a message to the Flask backend and handle the response.
   * 
   * @param {string} text - The user's message text
   */
  const sendMessage = useCallback(async (text) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    // 1. Add user message to the chat immediately
    const userMsg = createMessage('user', trimmed);
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      // 2. Call the Flask /api/chat endpoint
      const response = await axios.post(`${API_BASE}/chat`, {
        message: trimmed,
        session_id: sessionId
      }, {
        timeout: 10000  // 10 second timeout
      });

      // 3. Small delay to simulate natural typing feel (400-900ms)
      await new Promise(r => setTimeout(r, 400 + Math.random() * 500));

      // 4. Extract response data from API
      const { bot_response, intent, confidence, processed_text, nlp_steps } = response.data;

      // 5. Add bot response message
      const botMsg = createMessage('bot', bot_response, {
        intent,
        confidence,
        processed_text,
        nlp_steps
      });

      setMessages(prev => [...prev, botMsg]);

    } catch (error) {
      // Handle errors gracefully
      console.error('Chat API error:', error);

      let errorText;
      if (error.code === 'ECONNREFUSED' || !error.response) {
        errorText = "⚠️ **Connection Error**: Cannot reach the backend server.\n\nMake sure you've started the Flask server:\n```\ncd backend && python app.py\n```";
      } else if (error.response?.status === 500) {
        errorText = "❌ **Server Error**: The backend encountered an issue. Check the Flask console for details.";
      } else {
        errorText = `❌ **Error**: ${error.message}. Please try again.`;
      }

      const errorMsg = createMessage('bot', errorText, { intent: 'error', confidence: 0 });
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  }, [sessionId, isTyping]);

  /**
   * Clear all chat messages and reset to initial state.
   * Also calls the backend to clear session history.
   */
  const clearChat = useCallback(async () => {
    // Reset frontend messages
    setMessages([INITIAL_MESSAGE]);
    setInputText('');
    setIsTyping(false);

    // Clear backend session history
    try {
      await axios.post(`${API_BASE}/clear`, { session_id: sessionId });
    } catch (e) {
      console.warn('Could not clear backend session:', e.message);
    }
  }, [sessionId]);

  return (
    <div className="flex h-screen pt-16 bg-gray-50 dark:bg-dark-900 overflow-hidden">

      {/* ─── Mobile Sidebar Overlay ─── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ─── Chat Sidebar ─── */}
      <div className={`
        fixed lg:relative z-30 lg:z-auto
        h-full lg:h-auto
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <ChatSidebar
          messages={messages}
          onClearChat={clearChat}
          onClose={() => setSidebarOpen(false)}
          sessionId={sessionId}
        />
      </div>

      {/* ─── Main Chat Window ─── */}
      <ChatWindow
        messages={messages}
        isTyping={isTyping}
        inputText={inputText}
        onInputChange={setInputText}
        onSendMessage={sendMessage}
        onClearChat={clearChat}
        onToggleSidebar={() => setSidebarOpen(prev => !prev)}
        sidebarOpen={sidebarOpen}
      />
    </div>
  );
}
