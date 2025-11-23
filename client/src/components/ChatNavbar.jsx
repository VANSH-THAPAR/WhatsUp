import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { connectWS } from '../Client'; // Import Socket

const ChatNavbar = () => {
  const [contacts, setContacts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [myEmail, setMyEmail] = useState('');
  const navigate = useNavigate();
  const socket = useRef(null);

  const SVGIcon = ({ d, title }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6 fill-current" title={title}>
      <path d={d} />
    </svg>
  );

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

  // 1. Fetch My Info & Contacts
  const fetchContacts = async () => {
      try {
        const res = await axios.get(`${backendUrl}/contacts`, { withCredentials: true });
        setContacts(res.data);
      } catch (err) { console.error(err); }
  };

  useEffect(() => {
    const init = async () => {
        try {
            const me = await axios.get(`${backendUrl}/me`, { withCredentials: true });
            setMyEmail(me.data.email);
            fetchContacts();
        } catch(e) { console.error(e); }
    };
    init();
  }, []);

  // 2. Socket Listener for Notifications
  useEffect(() => {
    if(!myEmail) return;
    
    socket.current = connectWS();
    
    // Join my personal notification room
    socket.current.emit('registerUser', myEmail);

    // If I get a notification, refresh contacts to show new badge
    socket.current.on('newNotification', (data) => {
        console.log("New Message from:", data.senderEmail);
        // Ideally, optimize this to just increment state, but fetching is safer for sync
        fetchContacts(); 
    });

    return () => { if(socket.current) socket.current.disconnect(); }
  }, [myEmail]);

  // 3. Search Logic
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchTerm.trim()) {
        const res = await axios.get(`${backendUrl}/search-users?q=${searchTerm}`, { withCredentials: true });
        setSearchResults(res.data);
      } else { setSearchResults([]); }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleUserClick = (user) => {
    navigate(`/chats/${user.email}`);
    // Clear unread count locally for instant feedback
    setContacts(prev => prev.map(c => c.email === user.email ? {...c, unreadCount: 0} : c));
  };

  const displayList = searchTerm ? searchResults : contacts;

  return (
    <div className="w-[30%] bg-zinc-900 border-r border-zinc-700 h-full text-white p-5 flex flex-col">
      <div className='flex justify-between items-center mb-6'>
        <div className="text-2xl font-bold text-green-400">WhatsUp</div>
        <SVGIcon d="M224 512c35.3 0 64-28.7 64-64V384H160v64c0 35.3 28.7 64 64 64zm-32-80V32h64V128h64V32h64V128h64V32h32c17.7 0 32 14.3 32 32v288c0 17.7-14.3 32-32 32H0c-17.7 0-32-14.3-32-32V64c0-17.7 14.3-32 32-32h32v96h64V32h64v96h64V32h64v32h32v256h-32c-17.7 0-32 14.3-32 32z"/>
      </div>
      
      <div className='bg-zinc-800 rounded-full h-10 flex items-center px-4 mb-4 border border-zinc-700'>
        <SVGIcon d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 64c77.3 0 140 62.7 140 140S285.3 348 208 348 68 285.3 68 208 130.7 64 208 64z" />
        <input type="text" className='ml-3 w-full bg-transparent outline-none text-white text-sm' placeholder='Search users...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      
      <div className='grow overflow-y-auto space-y-2 custom-scrollbar'>
        <p className='text-xs uppercase font-bold text-zinc-500 mb-2'>{searchTerm ? 'Results' : 'Chats'}</p>
        
        {displayList.map((user, idx) => (
            <div key={idx} onClick={() => handleUserClick(user)} className='bg-zinc-800 p-3 rounded-lg hover:bg-zinc-700 cursor-pointer flex items-center gap-3 justify-between'>
               <div className='flex items-center gap-3 overflow-hidden'>
                   <div className='w-10 h-10 rounded-full bg-green-700 flex items-center justify-center text-white font-bold shrink-0'>
                     {user.userName.charAt(0).toUpperCase()}
                   </div>
                   <div className='flex flex-col'>
                     <span className='font-medium text-gray-200'>{user.userName}</span>
                     <span className='text-xs text-zinc-500 truncate w-32'>{user.email}</span>
                   </div>
               </div>
               
               {/* UNREAD BADGE */}
               {!searchTerm && user.unreadCount > 0 && (
                   <div className='w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-[10px] text-black font-bold'>
                       {user.unreadCount}
                   </div>
               )}
            </div>
        ))}
      </div>
    </div>
  )
}
export default ChatNavbar;