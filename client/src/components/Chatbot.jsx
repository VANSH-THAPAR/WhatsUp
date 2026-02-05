import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, RefreshCw, Sliders } from 'lucide-react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hello! I am your configured AI assistant. How can I help?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  // This state is just for the UI label at the bottom
  const [displaySettings, setDisplaySettings] = useState(null);
  
  const messagesEndRef = useRef(null);

  // Load initial settings for UI display only
  const loadSettingsForDisplay = () => {
    const saved = localStorage.getItem('chatbot_settings');
    if (saved) setDisplaySettings(JSON.parse(saved));
  };

  useEffect(() => {
    loadSettingsForDisplay();
    // Optional: Listen for storage events if you want the UI to update instantly across tabs
    window.addEventListener('storage', loadSettingsForDisplay);
    return () => window.removeEventListener('storage', loadSettingsForDisplay);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // --- CRITICAL FIX: READ LATEST SETTINGS HERE ---
    // We do not rely on state because it might be stale.
    // We read directly from the "Brain" (localStorage) right before sending.
    const rawSettings = localStorage.getItem('chatbot_settings');
    const currentSettings = rawSettings ? JSON.parse(rawSettings) : {
        mood: 'helpful',
        temperature: 0.7,
        systemPrompt: "You are a helpful assistant."
    };
    
    // Update the UI label too
    setDisplaySettings(currentSettings);

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
      
      const response = await axios.post(`${API_URL}/api/chat`, {
        message: input,
        settings: currentSettings // Sending the FRESH settings
      });

      const aiMessage = { role: 'ai', content: response.data.response };
      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'ai', content: "Error connecting to AI. Is the server running?", isError: true }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col h-full bg-zinc-900 rounded-3xl overflow-hidden'> 
      {/* 1. Messages Area */}
      <div className='flex-1 overflow-y-auto custom-scrollbar p-2 sm:p-4 space-y-4'>
        {messages.map((msg, index) => (
          <div key={index} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-green-600' : 'bg-zinc-700'}`}>
              {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
            </div>
            <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl max-w-[85%] whitespace-pre-wrap text-sm sm:text-base break-words ${
              msg.role === 'user' 
                ? 'bg-green-600 text-black rounded-tr-none' 
                : msg.isError 
                  ? 'bg-red-500/20 text-red-200 border border-red-500/50 rounded-tl-none'
                  : 'bg-zinc-800 text-zinc-100 rounded-tl-none'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        
        {loading && (
          <div className='flex gap-3'>
            <div className='w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-zinc-700 flex items-center justify-center shrink-0 animate-pulse'>
              <Bot size={14} />
            </div>
            <div className='bg-zinc-800 p-3 sm:p-4 rounded-xl sm:rounded-2xl rounded-tl-none text-zinc-400 italic flex items-center gap-2 text-sm sm:text-base'>
              <RefreshCw className='animate-spin' size={14} /> Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 2. Input Area */}
      <form onSubmit={handleSend} className='p-2 sm:p-4 relative bg-zinc-900'>
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={displaySettings?.enableDocs ? "Ask a question about your docs..." : "Type a message..."}
            className='w-full bg-zinc-800/50 border border-zinc-600 rounded-xl py-3 sm:py-4 pl-3 sm:pl-4 pr-10 sm:pr-12 text-white focus:outline-none focus:border-green-500 transition-all text-sm sm:text-base'
          />
          <button 
            type="submit" 
            disabled={loading}
            className='absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-500 text-black rounded-lg p-2 transition-colors disabled:opacity-50'
          >
            <Send size={18} />
          </button>
        </div>
        
        {/* 3. Settings Indicator */}
        <div className='mt-2 text-[10px] sm:text-xs text-zinc-500 flex items-center gap-2 justify-center'>
          <Sliders size={10} />
          <span>Persona: {displaySettings?.mood || 'Default'}</span>
          {displaySettings?.enableDocs && <span className='text-green-500 font-bold'>• RAG Active</span>}
        </div>
      </form>
    </div>
  );
};

export default Chatbot;