import React, { useEffect, useRef, useState } from 'react'
import { connectWS } from '../Client'; 
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

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
      <div className="p-4 border-b border-zinc-700 bg-zinc-800 flex items-center justify-between gap-3">
         <div className='flex items-center gap-3'>
            <div className='w-8 h-8 rounded-full bg-green-700 flex items-center justify-center font-bold'>
                {targetEmail.charAt(0).toUpperCase()}
            </div>
            <div>
                <p className='font-bold'>{targetEmail}</p>
                <p className='text-xs text-green-400'>Online</p>
            </div>
         </div>
         {/* Status Indicator */}
         <div className='text-xs text-zinc-500'>
             {conversationId ? <span className='text-green-500'>• Connected</span> : <span className='text-yellow-500'>• Connecting...</span>}
         </div>
      </div>

      {/* Messages */}
      <div className='flex-grow overflow-y-auto p-4 space-y-3 custom-scrollbar' style={{ height: '80%' }}>
        {messages.map((msg, index) => {
            const isMe = msg.senderEmail === myEmail;
            return (
              <div key={msg.id || index} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] p-3 shadow-md rounded-xl ${isMe ? 'bg-green-700 rounded-tr-none' : 'bg-zinc-800 rounded-tl-none'}`}>
                  <p className='text-sm text-gray-100 whitespace-pre-wrap'>{msg.text}</p>
                  <p className={`text-[10px] mt-1 text-right ${isMe ? 'text-green-200' : 'text-zinc-400'}`}>{msg.time}</p>
                </div>
              </div>
            )
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className='p-3 bg-zinc-900 border-t border-zinc-700'>
        <div className='rounded-full bg-zinc-800 p-2 flex items-center gap-2'>
          <input 
            type="text" 
            placeholder={conversationId ? 'Type a message...' : 'Connecting...'}
            disabled={!conversationId}
            className='grow bg-transparent px-3 text-white outline-none disabled:opacity-50' 
            onChange={(e) => setText(e.target.value)} 
            value={text} 
            onKeyDown={(e) => e.key === 'Enter' && handleSend()} 
          />
          <button onClick={handleSend} disabled={!text.trim() || !conversationId} className={`${text.trim() && conversationId ? 'text-green-500' : 'text-zinc-600'} p-2`}>
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-6 h-6 fill-current'><path d="M498.1 5.6c11.3 6.6 17.6 18.2 17.6 30.5V474.7c0 12.3-6.4 23.9-17.6 30.5s-24.1 6.3-36-1.1L.6 270.8c-10.7-6.1-12.7-19.6-4.1-27.7l46.2-44.5 137.9 79.1 169.5-188.7c7.8-8.7 20.3-10.3 29.5-4.1s13.4 16.9 10 27.6L191.8 387.2c-2.4 7.2-8.6 12.4-16.1 14.2l-152 35.1C21.7 441.2 7.7 440.3 0 432.2L0 432V432z"/></svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default PrivateChat;