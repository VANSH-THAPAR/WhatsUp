import React, { useState, useEffect, useRef } from 'react';
// FIX: Added 'Sliders' to the import list below
import { Send, Bot, User, RefreshCw, AlertCircle, Sliders } from 'lucide-react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hello! I am your configured AI assistant. How can I help?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState(null);
  const messagesEndRef = useRef(null);

  // Load settings on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('chatbot_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    } else {
      // Default fallback
      setSettings({
        mood: 'helpful',
        temperature: 0.7,
        systemPrompt: 'You are a helpful assistant.',
        enableDocs: false
      });
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Send Message + Current Settings to Backend
      // Note: Make sure your .env is set up or use localhost:8000 directly for testing
      const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
      
      const response = await axios.post(`${API_URL}/api/chat`, {
        message: input,
        settings: settings // Passing the "Brain" config
      });

      const aiMessage = { role: 'ai', content: response.data.response };
      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'ai', content: "Error connecting to the AI brain. Is FastAPI running?", isError: true }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col h-full'> 
      {/* 1. Messages Area */}
      <div className='flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4'>
        {messages.map((msg, index) => (
          <div key={index} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-green-600' : 'bg-zinc-700'}`}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>

            {/* Bubble */}
            <div className={`p-4 rounded-2xl max-w-[80%] whitespace-pre-wrap ${
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
            <div className='w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center shrink-0 animate-pulse'>
              <Bot size={16} />
            </div>
            <div className='bg-zinc-800 p-4 rounded-2xl rounded-tl-none text-zinc-400 italic flex items-center gap-2'>
              <RefreshCw className='animate-spin' size={14} /> Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 2. Input Area */}
      <form onSubmit={handleSend} className='mt-4 relative pb-2'>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={settings?.enableDocs ? "Ask a question about your project docs..." : "Type a message..."}
          className='w-full bg-zinc-800/50 border border-zinc-600 rounded-xl py-4 pl-4 pr-12 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all'
        />
        <button 
          type="submit" 
          disabled={loading}
          className='absolute right-2 top-2 bottom-4 bg-green-600 hover:bg-green-500 text-black rounded-lg p-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        >
          <Send size={20} />
        </button>
      </form>
      
      {/* 3. Settings Indicator */}
      <div className='mt-0 mb-2 text-xs text-zinc-500 flex items-center gap-2 justify-center'>
        <Sliders size={10} />
        <span>Active Persona: {settings?.mood || 'Default'} | Temp: {settings?.temperature || 0.7}</span>
        {settings?.enableDocs && <span className='text-green-500 font-bold'>• RAG Active</span>}
      </div>
    </div>
  );
};

export default Chatbot;