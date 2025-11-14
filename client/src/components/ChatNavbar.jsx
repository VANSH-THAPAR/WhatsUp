import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const ChatNavbar = () => {
  return (
    <div className="w-[30%] border border-zinc-700 h-full text-white p-5">
    {/* this is the first layer */}
        <div className='flex flex-row justify-between'>
            <div className="text-2xl font-semibold">
            WhatsUp
        </div>
        <div className="text-2xl">
            <FontAwesomeIcon icon={faBell} />
        </div>
        </div>
    {/* this is the search layer */}
    {/* here just temp i am using input instead i have to use react hook forms */}
    <div className='bg-zinc-800 rounded-4xl w-full h-10 flex justify-start gap-4 items-center mt-5 px-4 hover:border-green-500'>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input type="text" className='focus:outline-none w-full' placeholder='Search chat... ' />
    </div>
    
    </div>
  )
}

export default ChatNavbar