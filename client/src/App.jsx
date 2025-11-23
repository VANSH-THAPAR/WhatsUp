import React from 'react'
import { Routes, Route } from 'react-router-dom';

import IconNavbar from './components/IconNavbar';
import ChatNavbar from './components/ChatNavbar';
import Community from './components/Community';
import PrivateChat from './components/PrivateChat';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';

const App = () => {
  // The "Glass" Layout Wrapper
  const GlassLayout = ({ children }) => (
    <div className="w-screen h-screen overflow-hidden relative flex bg-zinc-900"
         style={{ backgroundImage: "url('/bg.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
      
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-0"></div>

      {/* Content Layer */}
      <div className="relative z-10 flex w-full h-full p-4 md:p-6 gap-4 md:gap-6">
        <IconNavbar />
        {children}
      </div>
    </div>
  );

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      
      {/* Authenticated Routes */}
      <Route path='/chats/*' element={
        <GlassLayout>
          <ChatNavbar />
          <div className="grow h-full bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden relative shadow-2xl">
            <Routes>
              <Route path="/" element={
                <div className='w-full h-full flex flex-col items-center justify-center text-zinc-400 animate-fade-in'>
                  <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-green-400 to-emerald-600 mb-4" style={{fontFamily: "Rubik Puddles"}}>WhatsUp</h2>
                  <p>Select a contact to start messaging</p>
                </div>
              } />
              <Route path="/:email" element={<PrivateChat />} />
            </Routes>
          </div>
        </GlassLayout>
      } />

      <Route path='/community' element={
        <GlassLayout>
          <div className='w-full h-full bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl'>
            <Community />
          </div>
        </GlassLayout>
      } />

      <Route path='/chatbot' element={
        <GlassLayout>
          <div className='w-full h-full bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-white'>
            <h1 className="text-3xl font-bold text-green-400 mb-4">AI Assistant</h1>
            <p>Coming soon...</p>
          </div>
        </GlassLayout>
      } />

      <Route path='/settings' element={
        <GlassLayout>
          <div className='w-full h-full bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-white'>
            <h1 className="text-3xl font-bold text-green-400 mb-4">Settings</h1>
            <p>Configure your experience.</p>
          </div>
        </GlassLayout>
      } />

      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default App;