import React from 'react'
import { MessageCircle, Globe, Bot, Settings, LogOut } from 'lucide-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const IconNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname.includes(path);

  function handlelogout(){
    fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'}/logout`, {
      method: 'POST',
      credentials: 'include',
    })
    .then(response => {
      if (response.ok) {
        console.log('Logged out successfully');
        navigate('/');
      } else {
        console.error('Logout failed');
      }
    })
    .catch(error => {
      console.error('Error during logout:', error);
    });
  }

  // Helper component for Nav Items
  const NavItem = ({ to, pathName, icon: Icon }) => (
    <Link to={to} className="relative group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl transition-all duration-300 hover:bg-white/10">
      {/* Active Indicator Line */}
      {isActive(pathName) && (
        <span className="absolute left-1/2 -bottom-1 -translate-x-1/2 sm:left-0 sm:bottom-auto sm:translate-x-0 w-6 h-1 sm:w-1 sm:h-6 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]"></span>
      )}
      
      {/* Icon with Glow Effect */}
      <div className={`transition-all duration-300 ${isActive(pathName) ? 'text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.6)] scale-110' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
        <Icon size={20} className="sm:w-6 sm:h-6" />
      </div>
    </Link>
  );

  return (
    <div className='h-16 sm:h-full w-full sm:w-20 bg-zinc-900/60 backdrop-blur-xl border border-white/5 rounded-2xl sm:rounded-3xl flex flex-row sm:flex-col items-center justify-between sm:justify-start px-4 sm:px-0 py-2 sm:py-8 gap-2 sm:gap-6 shadow-xl'>  
      
      {/* Brand Logo Placeholder */}
      <Link to="/" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-linear-to-br from-green-400 to-emerald-600 flex items-center justify-center text-black font-bold sm:mb-4 shadow-lg shadow-green-500/20 cursor-pointer text-xs sm:text-sm shrink-0" style={{fontFamily: "Rubik Puddles"}}>
        W
      </Link>

      {/* Navigation Links */}
      <div className="flex flex-row sm:flex-col gap-1 sm:gap-6 items-center justify-center grow sm:grow-0">
        <NavItem to="/chats" pathName="/chats" icon={MessageCircle} />
        <NavItem to="/community" pathName="/community" icon={Globe} />
        <NavItem to="/chatbot" pathName="/chatbot" icon={Bot} />
        <NavItem to="/settings" pathName="/settings" icon={Settings} />
      </div>

      <div className='hidden sm:block grow'></div>

      <div className='hidden sm:flex group w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl items-center justify-center hover:bg-red-500/20 cursor-pointer transition-all duration-300 sm:mb-4' onClick={handlelogout}>
        <div className='text-zinc-400 group-hover:text-red-500 transition-colors duration-300'>
          <LogOut size={20} className="sm:w-6 sm:h-6" />
        </div>
      </div>
      
      {/* Mobile Logout (condensed) */}
      <div className='sm:hidden group p-2 rounded-xl hover:bg-red-500/20 cursor-pointer transition-all duration-300' onClick={handlelogout}>
         <LogOut size={18} className="text-zinc-400 group-hover:text-red-500" />
      </div>

    </div>
  )
}

export default IconNavbar