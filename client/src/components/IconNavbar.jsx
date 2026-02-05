import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faEarthAmericas, faRobot, faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
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
  const NavItem = ({ to, pathName, icon }) => (
    <Link to={to} className="relative group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl transition-all duration-300 hover:bg-white/10">
      {/* Active Indicator Line */}
      {isActive(pathName) && (
        <span className="absolute left-0 bottom-0 sm:bottom-auto w-1 h-6 bg-green-500 rounded-r-full shadow-[0_0_10px_#22c55e]"></span>
      )}
      
      {/* Icon with Glow Effect */}
      <div className={`text-lg sm:text-xl transition-all duration-300 ${isActive(pathName) ? 'text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.6)] scale-110' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
        <FontAwesomeIcon icon={icon} />
      </div>
    </Link>
  );

  return (
    <div className='h-auto sm:h-full w-full sm:w-20 bg-zinc-900/60 backdrop-blur-xl border border-white/5 rounded-2xl sm:rounded-3xl flex sm:flex-col items-center px-2 sm:px-0 py-3 sm:py-8 gap-3 sm:gap-6 shadow-xl'>  
      
      {/* Brand Logo Placeholder */}
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-linear-to-br from-green-400 to-emerald-600 flex items-center justify-center text-black font-bold mb-0 sm:mb-4 shadow-lg shadow-green-500/20 cursor-default text-xs sm:text-sm" style={{fontFamily: "Rubik Puddles"}}>
        W
      </div>

      {/* Navigation Links */}
      <div className="flex flex-row sm:flex-col gap-3 sm:gap-6 w-full items-center">
        <NavItem to="/chats" pathName="/chats" icon={faMessage} />
        <NavItem to="/community" pathName="/community" icon={faEarthAmericas} />
        <NavItem to="/chatbot" pathName="/chatbot" icon={faRobot} />
        <NavItem to="/settings" pathName="/settings" icon={faGear} />
      </div>

      <div className="grow"></div>

      <div className='group w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center hover:bg-red-500/20 cursor-pointer transition-all duration-300 mb-0 sm:mb-4 text-lg sm:text-xl' onClick={handlelogout}>
        <div className='text-zinc-400 group-hover:text-red-500 transition-colors duration-300'>
          <FontAwesomeIcon icon={faRightFromBracket} />
        </div>
      </div>

    </div>
  )
}

export default IconNavbar