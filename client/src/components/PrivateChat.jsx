import React, { useEffect, useRef, useState } from 'react'
import { connectWS } from '../Client'; 
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Send } from 'lucide-react';

const PrivateChat = () => {
  const { email: targetEmail } = useParams(); 
  const navigate = useNavigate();
  const socket = useRef(null);
  
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [myEmail, setMyEmail] = useState('');
  const [conversationId, setConversationId] = useState(null);
  const messagesEndRef = useRef(null); 

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 1. Fetch My Info
  useEffect(() => {
    const fetchMe = async() => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'}/me`, {withCredentials: true});
        setMyEmail(response.data.email);
      } catch(err) {
        if(err.response?.status === 401) navigate('/login');
      }
    }
    fetchMe();
  }, [navigate]);

  // 2. Auto-scroll
  useEffect(() => { scrollToBottom(); }, [messages]);

  // 3. Connect Socket
  useEffect(() => {
    if (!myEmail || !targetEmail) return;
    
    // Reset conversation ID when switching users
    setConversationId(null); 
    setMessages([]);

    socket.current = connectWS();

    const onConnect = () => {
      console.log("Connected to Private Chat Socket");
      socket.current.emit('joinPrivateChat', { myEmail, targetEmail });
    };

    const onHistory = (data) => {
        console.log("Joined Room, ID:", data.conversationId);
        setMessages(data.history || []);
        setConversationId(data.conversationId); // This enables the send button
    };

    const onMessageReceive = (msg) => {
        setMessages((prev) => [...prev, msg]);
    };

    socket.current.on('connect', onConnect);
    socket.current.on('privateHistory', onHistory);
    socket.current.on('privateMessageReceive', onMessageReceive);

    return () => {
      if (socket.current) socket.current.disconnect();
    }
  }, [myEmail, targetEmail]);

  // 4. Send Message
// Inside PrivateChat.jsx

  // ... (rest of code)

  const handleSend = () => {
    if (!text.trim() || !conversationId) return;

    const msgData = {
        conversationId,
        senderEmail: myEmail,
        targetEmail: targetEmail, // <--- ADD THIS LINE
        text: text.trim()
    };

    socket.current.emit('privateMessage', msgData);
    setText('');
  };

  return (
    <div className='w-full h-full flex flex-col bg-zinc-900 text-white'>
      {/* Header */}
      <div className="p-3 sm:p-4 border-b border-zinc-700 bg-zinc-800 flex items-center justify-between gap-3">
         <div className='flex items-center gap-2 sm:gap-3 min-w-0'>
            <div className='w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-700 flex items-center justify-center font-bold flex-shrink-0 text-xs sm:text-sm'>
                {targetEmail.charAt(0).toUpperCase()}
            </div>
            <div className='min-w-0'>
                <p className='font-bold text-xs sm:text-sm truncate'>{targetEmail}</p>
                <p className='text-xs text-green-400'>Online</p>
            </div>
         </div>
         {/* Status Indicator */}
         <div className='text-xs text-zinc-500'>
             {conversationId ? <span className='text-green-500'>• Connected</span> : <span className='text-yellow-500'>• Connecting...</span>}
         </div>
      </div>

      {/* Messages Container */}
      <div className='grow overflow-y-auto p-2 sm:p-4 space-y-2 custom-scrollbar'>
        {messages.map((msg, index) => {
            const isMe = msg.senderEmail === myEmail;
            return (
              <div key={msg.id || index} className={`flex ${isMe ? 'justify-end' : 'justify-start'} px-1 sm:px-0`}>
                <div className={`max-w-xs sm:max-w-sm md:max-w-md p-2 sm:p-3 shadow-md relative rounded-lg sm:rounded-xl text-xs sm:text-sm ${isMe ? 'bg-green-700 rounded-tr-none' : 'bg-zinc-800 rounded-tl-none'}`}>
                  <p className='text-gray-100 break-words'>{msg.text}</p>
                  <p className={`text-[9px] sm:text-[10px] mt-1 text-right ${isMe ? 'text-green-200' : 'text-zinc-400'}`}>{msg.time}</p>
                </div>
              </div>
            )
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className='min-h-auto w-full border-t border-zinc-700 p-2 sm:p-3 bg-zinc-900'>
        <div className='rounded-full bg-zinc-800 p-2 flex items-center gap-1 sm:gap-2'>
          <input 
            type="text" 
            placeholder={conversationId ? 'Type your message...' : 'Connecting...'}
            disabled={!conversationId}
            className='flex-1 bg-transparent outline-none text-white placeholder-zinc-500 text-xs sm:text-sm disabled:opacity-50' 
            onChange={(e) => setText(e.target.value)} 
            value={text} 
            onKeyPress={(e) => e.key === 'Enter' && handleSend()} 
          />
          <button onClick={handleSend} disabled={!text.trim() || !conversationId} className={`${text.trim() && conversationId ? 'text-green-500' : 'text-zinc-600'} p-2 flex-shrink-0`}>
             <Send size={24} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default PrivateChat;