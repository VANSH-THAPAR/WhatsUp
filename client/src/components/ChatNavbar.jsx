import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { connectWS } from '../Client'; 

const ChatNavbar = () => {
  const [contacts, setContacts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [myEmail, setMyEmail] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const socket = useRef(null);

  const SVGIcon = ({ d, title }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current" title={title}>
      <path d={d} />
    </svg>
  );

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

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

  useEffect(() => {
    if(!myEmail) return;
    socket.current = connectWS();
    socket.current.emit('registerUser', myEmail);
    socket.current.on('newNotification', () => fetchContacts());
    return () => { if(socket.current) socket.current.disconnect(); }
  }, [myEmail]);

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
    setContacts(prev => prev.map(c => c.email === user.email ? {...c, unreadCount: 0} : c));
  };

  const displayList = searchTerm ? searchResults : contacts;
  const currentChat = location.pathname.split('/').pop();

  return (
    <div className="w-[320px] bg-zinc-900/60 backdrop-blur-xl border border-white/5 rounded-3xl h-full flex flex-col shadow-xl overflow-hidden">
      {/* Header */}
      <div className='p-6 pb-4'>
        <div className='flex justify-between items-center mb-6'>
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-green-400 to-emerald-500" style={{fontFamily: "Rubik Puddles"}}>WhatsUp</div>
          <div className="text-zinc-400 hover:text-green-400 transition-colors cursor-pointer">
              <SVGIcon title="Notifications" d="M224 512c35.3 0 64-28.7 64-64V384H160v64c0 35.3 28.7 64 64 64zm-32-80V32h64V128h64V32h64V128h64V32h32c17.7 0 32 14.3 32 32v288c0 17.7-14.3 32-32 32H0c-17.7 0-32-14.3-32-32V64c0-17.7 14.3-32 32-32h32v96h64V32h64v96h64V32h64v32h32v256h-32c-17.7 0-32 14.3-32 32z"/>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className='group bg-zinc-800/50 rounded-2xl h-12 flex items-center px-4 border border-zinc-700/50 focus-within:border-green-500/50 focus-within:bg-zinc-800 focus-within:shadow-[0_0_15px_rgba(34,197,94,0.1)] transition-all duration-300'>
          <div className="text-zinc-500 group-focus-within:text-green-400 transition-colors">
            <SVGIcon d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 64c77.3 0 140 62.7 140 140S285.3 348 208 348 68 285.3 68 208 130.7 64 208 64z" />
          </div>
          <input 
            type="text" 
            className='ml-3 w-full bg-transparent outline-none text-zinc-200 text-sm placeholder-zinc-500' 
            placeholder='Search people...' 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
      </div>
      <div className='grow overflow-y-auto px-4 pb-4 space-y-2 custom-scrollbar'>
        <p className='text-[10px] uppercase tracking-widest font-bold text-zinc-500 mb-3 ml-2'>
            {searchTerm ? 'Global Results' : 'Recent Chats'}
        </p>
        
        {displayList.map((user, idx) => {
            const isActive = currentChat === user.email;
            return (
              <div key={idx} onClick={() => handleUserClick(user)} 
                  className={`group p-3 rounded-2xl cursor-pointer flex items-center gap-4 transition-all duration-300 border border-transparent
                  ${isActive 
                    ? 'bg-green-500/10 border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]' 
                    : 'hover:bg-white/5 hover:border-white/5'}`}
              >
                <div className={`relative w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300
                    ${isActive ? 'bg-linear-to-br from-green-400 to-emerald-600 text-black shadow-lg shadow-green-500/30' : 'bg-zinc-800 text-zinc-400 group-hover:bg-zinc-700 group-hover:text-zinc-200'}`}>
                    {user.userName.charAt(0).toUpperCase()}
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-zinc-900 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                </div>
                
                <div className='flex flex-col grow min-w-0'>
                    <div className="flex justify-between items-center">
                        <span className={`font-semibold truncate ${isActive ? 'text-white' : 'text-zinc-300 group-hover:text-white'}`}>
                            {user.userName}
                        </span>
                        {!searchTerm && user.unreadCount > 0 && (
                            <div className='w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-[10px] text-black font-bold shadow-md shadow-green-500/40 animate-pulse'>
                                {user.unreadCount}
                            </div>
                        )}
                    </div>
                    <span className='text-xs text-zinc-500 truncate w-full'>{user.email}</span>
                </div>
              </div>
            )
        })}
      </div>
    </div>
  )
}
export default ChatNavbar;