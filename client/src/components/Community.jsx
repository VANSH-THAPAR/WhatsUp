import React, { useEffect, useRef, useState } from 'react'
import { connectWS } from '../Client'; // Make sure Client.js is in src/
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Community = () => {
  const socket = useRef(null);
  const [message, setMessage] = useState([]);
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState(''); 
  const navigate = useNavigate();
  const messagesEndRef = useRef(null); 

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchuser = async() => {
    try{
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'}/me`, {withCredentials: true});
      setName(response.data.userName);
      setEmail(response.data.email); 
    } catch(err){
      if(err.response && err.response.status === 401) navigate('/login');
      console.error("Auth error:", err);
    }
  }
  
  useEffect(()=>{ fetchuser(); },[])
  
  // Auto-scroll on new message
  useEffect(() => { scrollToBottom(); }, [message]);

  const handlechatsubmit = () => {
    if (!text.trim() || !socket.current || !name || !email) return;
    const msg = { sender: name, senderEmail: email, text: text.trim() };
    socket.current.emit('chatMessage', msg)
    setText('');
  }

  useEffect(() => {
    if (!name || !email) return;
    
    // Connect only when we have user details
    socket.current = connectWS(); 

    const onConnect = () => {
      console.log("Connected to Socket");
      socket.current.emit('joinRoom', { userName: name, userEmail: email });
    };

    const onChatMessage = (msg) => {
      setMessage((prev) => [...prev, msg]);
    };
    
    const onChatHistory = (history) => {
        setMessage(history); 
    };

    socket.current.on('connect', onConnect);
    socket.current.on('chatMessage', onChatMessage);
    socket.current.on('chatHistory', onChatHistory); 

    return () => {
      if (socket.current) {
        socket.current.off('connect', onConnect);
        socket.current.off('chatMessage', onChatMessage);
        socket.current.off('chatHistory', onChatHistory);
        socket.current.disconnect();
      }
    }
  }, [name, email]); 

  return (
    <div className='w-full h-full flex flex-col bg-zinc-900 text-white'>
      {/* Messages Area */}
      <div className='grow overflow-y-auto p-4 space-y-3' style={{ height: '90%' }}>
        {message.map((msg, index) => {
            const isMe = msg.sender === name; 
            return (
              <div key={msg.id || index} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] md:max-w-md p-3 shadow-md relative rounded-xl ${isMe ? 'bg-green-700 rounded-tr-none' : 'bg-zinc-800 rounded-tl-none'}`}>
                  {!isMe && <p className='text-xs font-bold mb-1 text-red-400'>{msg.sender}</p>}
                  <p className='text-sm text-gray-100 whitespace-pre-wrap'>{msg.text}</p>
                  <p className={`text-[10px] mt-1 text-right ${isMe ? 'text-green-200' : 'text-zinc-400'}`}>{msg.time}</p>
                </div>
              </div>
            )
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className='min-h-[10%] w-full border-t border-zinc-700 p-3 bg-zinc-900'>
        <div className='rounded-full bg-zinc-800 p-2 flex items-center gap-2'>
          <input 
            type="text" 
            placeholder='Type a message...' 
            className='grow bg-transparent px-3 text-white outline-none placeholder-zinc-500' 
            onChange={(e) => { setText(e.target.value) }} 
            value={text} 
            onKeyDown={(e) => e.key === 'Enter' && handlechatsubmit()} 
          />
          <button onClick={handlechatsubmit} disabled={!text.trim()} className={`${text.trim() ? 'text-green-500' : 'text-zinc-600'} p-2 transition-colors`}>
            {/* SVG Send Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-6 h-6 fill-current'>
              <path d="M498.1 5.6c11.3 6.6 17.6 18.2 17.6 30.5V474.7c0 12.3-6.4 23.9-17.6 30.5s-24.1 6.3-36-1.1L.6 270.8c-10.7-6.1-12.7-19.6-4.1-27.7l46.2-44.5 137.9 79.1 169.5-188.7c7.8-8.7 20.3-10.3 29.5-4.1s13.4 16.9 10 27.6L191.8 387.2c-2.4 7.2-8.6 12.4-16.1 14.2l-152 35.1C21.7 441.2 7.7 440.3 0 432.2L0 432V432z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
export default Community;