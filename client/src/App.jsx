import React from 'react'
import { useEffect } from 'react';
import IconNavbar from './components/IconNavbar';
import ChatNavbar from './components/ChatNavbar';

const App = () => {

  return (
    <>
    <div className="w-auto h-screen flex flex-row bg-zinc-900">
      <IconNavbar/>
      <ChatNavbar/>
    </div>
    </>
  )
}

export default App