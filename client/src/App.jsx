import React from 'react'
import { useEffect } from 'react';
import {Routes , Route , Link} from 'react-router-dom';

import IconNavbar from './components/IconNavbar';
import ChatNavbar from './components/ChatNavbar';
import Community from './components/Community';
import Home from './components/Home';

const App = () => {

  return (
    <>
      <Routes>
        <Route path='/' element={
          <>
            <Home/>
          </>
        } />
        <Route path='/chats' element={
          <div className="w-auto h-screen flex flex-row bg-zinc-900">
            <IconNavbar/>
            <ChatNavbar/>
          </div>
        } />
        <Route path='/community' element={
          <div className="w-auto h-screen flex flex-row bg-zinc-900">
            <IconNavbar/>
            <div className='w-full border border-zinc-700 h-full text-white p-5'>
              <Community />
            </div>
          </div>
        } />
        <Route path='/chatbot' element={
          <div className="w-auto h-screen flex flex-row bg-zinc-900">
            <IconNavbar/>
            <div className='w-[30%] border border-zinc-700 h-full text-white p-5'>
              ChatBot Page
            </div>
          </div>
        } />
        <Route path='/settings' element={
          <div className="w-auto h-screen flex flex-row bg-zinc-900">
            <IconNavbar/>
            <div className='w-[30%] border border-zinc-700 h-full text-white p-5'>
              Settings Page
            </div>
          </div>
        } />
      </Routes>
    </>
  )
}

export default App