import React, { useEffect, useRef, useState } from 'react'
import { connectWS } from '../Client'; // Make sure Client.js is in src/
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

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
          <button 
  onClick={handlechatsubmit} 
  disabled={!text.trim()} 
  className={`group w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ease-out
    ${text.trim() 
      ? 'bg-linear-to-r from-green-400 to-emerald-600 text-zinc-900 shadow-[0_0_15px_rgba(74,222,128,0.5)] hover:scale-110 hover:shadow-[0_0_25px_rgba(74,222,128,0.8)] active:scale-95' 
      : 'bg-zinc-800/50 text-zinc-600 cursor-not-allowed'
    }`}
>
  <FontAwesomeIcon 
    icon={faPaperPlane} 
    className={`text-lg transition-transform duration-300 ${text.trim() ? 'group-hover:-translate-y-0.5 group-hover:translate-x-0.5' : ''}`} 
  />
</button>
        </div>
      </div>
    </div>
  )
}
export default Community;