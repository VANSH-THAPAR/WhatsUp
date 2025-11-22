import React from 'react'
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

  return (
    <div className='w-screen h-screen bg-zinc-900' style={{ backgroundImage : "url('/bg.jpg')" , backgroundSize : "cover" , backgroundRepeat : "no-repeat" , backgroundPosition : "center"}}>
        <div className=" flex items-center h-full flex-col justify-start pt-50 gap-20">
            <div className='h-fit w-full flex justify-center items-center'>
                <h1 className='text-7xl text-green-500 font-extrabold' style={{fontFamily : "Cabin Sketch"}} >Welcome to WhatsUp</h1>
            </div>
            <div className='w-full h-fit flex justify-center' >
                <h2 className=' flex flex-col w-[70%] font-white text-2xl text-center text-white' style={{ fontFamily: "Poppins" }}>
                    <ul className='list-disc list-inside mb-5 text-start flex flex-col gap-5 text-3xl' style={{fontFamily: "lacquer"}}>
                        <li className='cursor-pointer transition-transform duration-300 ease-in-out hover:scale-[1.03]'>
                            WhatsUp brings you an intuitive messaging experience designed for speed and privacy.
                        </li>
                        <li className='cursor-pointer transition-transform duration-300 ease-in-out hover:scale-[1.03]'>
                            Create groups, exchange moments, and keep the conversation going.
                        </li>
                        <li className='cursor-pointer transition-transform duration-300 ease-in-out hover:scale-[1.03]' >
                            Our platform is built to feel natural and responsive.
                        </li>
                        <li className='cursor-pointer transition-transform duration-300 ease-in-out hover:scale-[1.03]'>
                            Stay connected with clarity and confidence.
                        </li>
                    </ul>
                </h2>
            </div>
            <div className="flex flex-row justify-evenly w-[60%] items-center gap-20">
                <div className="h-fit w-fit mt-9 rounded-4xl text-white text-5xl font-extrabold flex justify-center items-center cursor-pointer hover:text-green-500  transition-transform duration-300 ease-in-out hover:scale-[1.1]" style={{ fontFamily: "Rubik Puddles" }} onClick={() => navigate('/community')}>
                    Get Started
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home