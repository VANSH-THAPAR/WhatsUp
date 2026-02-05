import React from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

  return (
    <div className='w-screen h-screen bg-zinc-900 relative overflow-y-auto sm:overflow-hidden flex flex-col justify-center items-center' 
         style={{ backgroundImage: "url('/bg.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
        
        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

        {/* Main Content Container - Z-Index to sit above overlay */}
        <div className="relative z-10 w-full max-w-4xl px-4 sm:px-5 flex flex-col items-center gap-6 sm:gap-8 md:gap-12 py-8 sm:py-0">
            
            {/* Hero Title with Neon Gradient */}
            <div className='text-center animate-fade-in-down'>
                <h1 className='text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-green-400 via-emerald-500 to-green-600 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]' 
                    style={{fontFamily: "Rubik Puddles"}}>
                    WhatsUp
                </h1>
                <p className='text-zinc-300 text-sm sm:text-base md:text-lg lg:text-xl mt-2 sm:mt-4 tracking-widest uppercase font-bold' style={{fontFamily: "Cabin Sketch"}}>
                    The Future of Chat is Here
                </p>
            </div>

            {/* Glass Card for Features List */}
            <div className='w-full sm:w-[90%] md:w-[80%] bg-zinc-900/40 border border-zinc-700/50 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-[0_0_40px_rgba(34,197,94,0.1)] p-4 sm:p-8 md:p-12 transform transition-all hover:scale-[1.01] duration-500'>
                <ul className='flex flex-col gap-3 sm:gap-4 md:gap-6 text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-100' style={{fontFamily: "Poppins"}}>
                    {[
                        "Intuitive messaging designed for speed.",
                        "Private, encrypted, and secure conversations.",
                        "Real-time connection with clarity.",
                        "Exchange moments that matter."
                    ].map((item, index) => (
                        <li key={index} className='flex items-start sm:items-center gap-2 sm:gap-4 group cursor-default'>
                            {/* Custom Bullet Point */}
                            <span className='w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e] group-hover:scale-150 transition-transform duration-300 flex-shrink-0 mt-1 sm:mt-0'></span>
                            <span className='group-hover:text-green-300 transition-colors duration-300 shadow-black drop-shadow-md'>
                                {item}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* CTA Button */}
            <div className="mt-2 sm:mt-4">
                <button 
                    onClick={() => navigate('/community')}
                    className="relative group px-6 sm:px-8 md:px-12 py-3 sm:py-4 bg-transparent overflow-hidden rounded-full border-2 border-green-500 text-green-400 font-extrabold text-lg sm:text-2xl md:text-3xl lg:text-4xl transition-all duration-300 hover:bg-green-500 hover:text-black hover:shadow-[0_0_40px_rgba(34,197,94,0.6)]"
                    style={{ fontFamily: "Cabin Sketch" }}
                >
                    <span className="relative z-10">GET STARTED</span>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Home