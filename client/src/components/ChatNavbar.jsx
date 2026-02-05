import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { connectWS } from '../Client'; 
import { Search, Bell } from 'lucide-react';

const ChatNavbar = ({ className = '' }) => {
  const [contacts, setContacts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [myEmail, setMyEmail] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const socket = useRef(null);

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
    <div className={`w-full sm:w-[280px] md:w-[320px] bg-zinc-900/60 backdrop-blur-xl border border-white/5 rounded-2xl sm:rounded-3xl flex-1 min-h-0 flex flex-col shadow-xl overflow-hidden ${className}`}>
      {/* Header */}
      <div className='p-3 sm:p-6 pb-2 sm:pb-4'>
        <div className='flex justify-between items-center mb-4 sm:mb-6'>
          <Link to="/" className="text-lg sm:text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-green-400 to-emerald-500 cursor-pointer" style={{fontFamily: "Rubik Puddles"}}>WhatsUp</Link>
          <div className="text-zinc-400 hover:text-green-400 transition-colors cursor-pointer text-sm sm:text-base">
              <Bell size={20} className="sm:w-5 sm:h-5" />
          </div>
        </div>
        
        {/* Search Bar */}
        <div className='group bg-zinc-800/50 rounded-xl sm:rounded-2xl h-10 sm:h-12 flex items-center px-3 sm:px-4 border border-zinc-700/50 focus-within:border-green-500/50 focus-within:bg-zinc-800 focus-within:shadow-[0_0_15px_rgba(34,197,94,0.1)] transition-all duration-300'>
          <div className="text-zinc-500 group-focus-within:text-green-400 transition-colors text-sm sm:text-base">
            <Search size={18} className="sm:w-5 sm:h-5" />
          </div>
          <input 
            type="text" 
            className='ml-2 sm:ml-3 w-full bg-transparent outline-none text-zinc-200 text-xs sm:text-sm placeholder-zinc-500' 
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