import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';

import IconNavbar from './components/IconNavbar';
import ChatNavbar from './components/ChatNavbar';
import Community from './components/Community';
import PrivateChat from './components/PrivateChat';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import ChatbotSettings from './components/ChatbotSettings';
import Chatbot from './components/Chatbot';

const App = () => {
  const location = useLocation();
  const isChatDetailsOpen = location.pathname.startsWith('/chats/') && location.pathname.split('/').length > 2;

  // The "Glass" Layout Wrapper
  const GlassLayout = ({ children }) => (
    <div className="w-screen h-screen overflow-hidden relative flex flex-col sm:flex-row bg-zinc-900"
         style={{ backgroundImage: "url('/bg.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
      
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-0"></div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col sm:flex-row w-full h-full p-2 sm:p-4 md:p-6 gap-2 sm:gap-4 md:gap-6">
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
          <ChatNavbar className={isChatDetailsOpen ? 'hidden sm:flex' : 'flex'} />
          <div className={`flex-1 min-h-0 bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden relative shadow-2xl ${
            !isChatDetailsOpen ? 'hidden sm:block' : 'block'
          }`}>
            <Routes>
              <Route path="/" element={
                <div className='w-full h-full flex flex-col items-center justify-center text-zinc-400 animate-fade-in px-4'>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-green-400 to-emerald-600 mb-4" style={{fontFamily: "Rubik Puddles"}}>WhatsUp</h2>
                  <p className="text-sm sm:text-base">Select a contact to start messaging</p>
                </div>
              } />
              <Route path="/:email" element={<PrivateChat />} />
            </Routes>
          </div>
        </GlassLayout>
      } />

      <Route path='/community' element={
        <GlassLayout>
          <div className='w-full flex-1 min-h-0 bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl'>
            <Community />
          </div>
        </GlassLayout>
      } />

      <Route path='/chatbot' element={
        <GlassLayout>
          <div className='w-full flex-1 min-h-0 bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-white flex flex-col'>
            <h1 className="text-2xl sm:text-3xl font-bold text-green-400 mb-2 sm:mb-4 flex-shrink-0">AI Assistant</h1>
            <div className="flex-1 min-h-0 overflow-hidden">
                <Chatbot/>
            </div>
          </div>
        </GlassLayout>
      } />

      {/* --- UPDATED SETTINGS ROUTE --- */}
      <Route path='/settings' element={
        <GlassLayout>
          {/* 1. Outer Glass Container (Fixed Size) */}
          <div className='w-full flex-1 min-h-0 bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl text-white relative'>
            
            {/* 2. Scrollable Area (Content moves inside this) */}
            <div className='w-full h-full overflow-y-auto custom-scrollbar p-4 sm:p-6 md:p-10'>
                
                {/* 3. Centered Content Wrapper (Prevents stretching) */}
                <div className='max-w-4xl mx-auto'>
                    <div className='mb-6 sm:mb-8 border-b border-white/10 pb-4 sm:pb-6'>
                        <h1 className="text-2xl sm:text-3xl font-bold text-green-400">Settings</h1>
                        <p className="text-zinc-400 mt-1 sm:mt-2 text-sm sm:text-base">Manage your account preferences and AI configurations.</p>
                    </div>
                    
                    {/* The Settings Form */}
                    <ChatbotSettings/>
                </div>
            </div>
          </div>
        </GlassLayout>
      } />

      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default App;