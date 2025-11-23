import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ChatNavbar = ({ onSelectUser }) => { // Accept prop to handle selection
  const [contacts, setContacts] = useState([]); // People I already talk to
  const [searchResults, setSearchResults] = useState([]); // Search results
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const SVGIcon = ({ d, title }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6 fill-current" title={title}>
      <path d={d} />
    </svg>
  );

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

  // 1. Load Existing Contacts on Mount
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get(`${backendUrl}/contacts`, { withCredentials: true });
        setContacts(res.data);
      } catch (err) {
        console.error("Error fetching contacts:", err);
      }
    };
    fetchContacts();
  }, []);

  // 2. Handle Search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchTerm.trim()) {
        try {
          const res = await axios.get(`${backendUrl}/search-users?q=${searchTerm}`, { withCredentials: true });
          setSearchResults(res.data);
        } catch (err) {
            console.error("Search error", err);
        }
      } else {
        setSearchResults([]);
      }
    }, 300); // Debounce search to reduce API calls

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Handle clicking a user
  const handleUserClick = (user) => {
    // Navigate to the chat route with the selected user's email
    // We replace dots in email to make it URL safe if needed, or just pass purely
    navigate(`/chats/${user.email}`, { state: { userName: user.userName } });
    
    // Clear search if we started a new chat
    if (searchTerm) {
        setSearchTerm('');
        // Optimistically add to contacts list if not there
        if (!contacts.find(c => c.email === user.email)) {
            setContacts(prev => [...prev, user]);
        }
    }
  };

  // Decide which list to show
  const displayList = searchTerm ? searchResults : contacts;

  return (
    <div className="w-[30%] bg-zinc-900 border-r border-zinc-700 h-full text-white p-5 flex flex-col">
      <div className='flex justify-between items-center mb-6'>
        <div className="text-2xl font-bold text-green-400">WhatsUp</div>
        <div className="hover:text-green-400 cursor-pointer">
            <SVGIcon title="Notifications" d="M224 512c35.3 0 64-28.7 64-64V384H160v64c0 35.3 28.7 64 64 64zm-32-80V32h64V128h64V32h64V128h64V32h32c17.7 0 32 14.3 32 32v288c0 17.7-14.3 32-32 32H0c-17.7 0-32-14.3-32-32V64c0-17.7 14.3-32 32-32h32v96h64V32h64v96h64V32h64v32h32v256h-32c-17.7 0-32 14.3-32 32z"/>
        </div>
      </div>
      
      {/* Search Bar */}
      <div className='bg-zinc-800 rounded-full h-10 flex items-center px-4 mb-4 border border-zinc-700 focus-within:border-green-500 transition-colors'>
        <SVGIcon d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 64c77.3 0 140 62.7 140 140S285.3 348 208 348 68 285.3 68 208 130.7 64 208 64z" />
        <input 
            type="text" 
            className='ml-3 w-full bg-transparent outline-none text-white text-sm placeholder-zinc-500' 
            placeholder='Search users...' 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </div>
      
      {/* User List */}
      <div className='flex-grow overflow-y-auto space-y-2 custom-scrollbar'>
        <p className='text-xs uppercase font-bold text-zinc-500 mb-2'>
            {searchTerm ? 'Search Results' : 'Chats'}
        </p>
        
        {displayList.length > 0 ? (
          displayList.map((user, idx) => (
            <div 
                key={idx} 
                className='bg-zinc-800 p-3 rounded-lg hover:bg-zinc-700 cursor-pointer flex items-center gap-3 transition-colors'
                onClick={() => handleUserClick(user)}
            >
               <div className='w-10 h-10 rounded-full bg-green-700 flex items-center justify-center text-white font-bold select-none'>
                 {user.userName.charAt(0).toUpperCase()}
               </div>
               <div className='flex flex-col overflow-hidden'>
                 <span className='font-medium text-gray-200'>{user.userName}</span>
                 <span className='text-xs text-zinc-500 truncate'>{user.email}</span>
               </div>
            </div>
          ))
        ) : (
          <p className='text-zinc-500 text-sm text-center mt-4'>
            {searchTerm ? 'No users found' : 'No active chats. Search to start one.'}
          </p>
        )}
      </div>
    </div>
  )
}
export default ChatNavbar;