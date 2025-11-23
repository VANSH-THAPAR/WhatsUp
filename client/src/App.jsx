import React from 'react'
import {Routes , Route} from 'react-router-dom';

import IconNavbar from './components/IconNavbar';
import ChatNavbar from './components/ChatNavbar';
import Community from './components/Community';
// 1. IMPORT THE COMPONENT HERE
import PrivateChat from './components/PrivateChat'; 
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';

const App = () => {
  const DarkLayout = ({ children }) => (
    <div className="w-full h-screen flex flex-row bg-zinc-900">
      <IconNavbar/>
      {children}
    </div>
  );

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        
        {/* Chat Routes */}
        <Route path='/chats/*' element={
          <DarkLayout>
            <ChatNavbar/>
            <Routes>
                {/* Default screen when no chat selected */}
                <Route path="/" element={
                    <div className='w-full h-full text-white flex items-center justify-center border-l border-zinc-700'>
                        Select a user to begin chatting.
                    </div>
                } />
                
                {/* 2. USE THE COMPONENT HERE */}
                <Route path="/:email" element={<PrivateChat />} />
            </Routes>
          </DarkLayout>
        } />

        <Route path='/community' element={
          <DarkLayout>
            <div className='w-full border border-zinc-700 h-full text-white'>
              <Community />
            </div>
          </DarkLayout>
        } />
        
        <Route path='/chatbot' element={
          <DarkLayout>
            <div className='w-full border border-zinc-700 h-full text-white p-5'>ChatBot Page</div>
          </DarkLayout>
        } />
        <Route path='/settings' element={
          <DarkLayout>
            <div className='w-full border border-zinc-700 h-full text-white p-5'>Settings Page</div>
          </DarkLayout>
        } />
        <Route path = '/signup' element={<Signup/>} />
        <Route path = '/login' element={<Login/>} />
      </Routes>
    </>
  )
}

export default App;