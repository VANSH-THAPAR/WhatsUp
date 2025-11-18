import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage } from '@fortawesome/free-solid-svg-icons'
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons'
import { faRobot } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const IconNavbar = () => {
  const navigate = useNavigate();
  function handlelogout(){
    localStorage.clear();
    navigate('/');
  }
  return (
    <div className='h-full min-w-min w-15 text-white border border-zinc-700 flex flex-col items-center py-5 space-y-10'>  
      <div className="h-[70%] flex flex-col gap-5">
        <div className="text-2xl">
          <Link to="/chats">
            <FontAwesomeIcon icon={faMessage}/>
          </Link>
        </div>
        <div className="text-2xl">
          <Link to="/community">
            <FontAwesomeIcon icon={faEarthAmericas} />
          </Link>
        </div>
        <div className="text-2xl">
          <Link to="/chatbot">
            <FontAwesomeIcon icon={faRobot} />
          </Link>
        </div>
        <div className="text-2xl">
          <Link to="/settings">
            <FontAwesomeIcon icon={faGear} />
          </Link>
        </div>
      </div>
      <div className="h-[20%] flex flex-col justify-end pb-5">
        <div className='text-2xl' onClick={handlelogout} >
          <FontAwesomeIcon icon={faRightFromBracket} />
        </div>
      </div>

    </div>
  )
}

export default IconNavbar