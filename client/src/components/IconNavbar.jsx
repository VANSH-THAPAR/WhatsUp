import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage } from '@fortawesome/free-solid-svg-icons'
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons'
import { faRobot } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

const IconNavbar = () => {
  return (
    <div className='h-full min-w-min w-15 text-white border border-zinc-700 flex flex-col items-center py-5 space-y-10'>  
      <div className="h-[70%] flex flex-col gap-5">
        <div className="text-2xl">
          <FontAwesomeIcon icon={faMessage}/>
        </div>
        <div className="text-2xl">
          <FontAwesomeIcon icon={faEarthAmericas} />
        </div>
        <div className="text-2xl">
          <FontAwesomeIcon icon={faRobot} />
        </div>
        <div className="text-2xl">
          <FontAwesomeIcon icon={faGear} />
        </div>
      </div>
      <div className="h-[20%] flex flex-col justify-end pb-5">
        <div className='text-2xl' >
          <FontAwesomeIcon icon={faRightFromBracket} />
        </div>
      </div>

    </div>
  )
}

export default IconNavbar