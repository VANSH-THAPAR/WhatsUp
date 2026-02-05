import React from 'react'
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try{
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, data, {withCredentials: true});
      console.log("signup response:", response.data);
      navigate('/chats');
    } catch(err){
      console.error("Signup error:", err);
      alert("Signup Failed");
    }
  }

  return (
    <div className='w-screen min-h-screen flex justify-center items-center bg-zinc-900 relative overflow-y-auto sm:overflow-hidden' 
         style={{ backgroundImage: "url('/bg.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Glass Card */}
      <div className="relative z-10 w-[90%] sm:w-[85%] md:w-[50%] lg:w-[35%] xl:w-[28%] bg-zinc-900/40 border border-zinc-700/50 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-[0_0_40px_rgba(34,197,94,0.2)] p-6 sm:p-8 flex flex-col items-center transform transition-all hover:scale-[1.01] duration-500 my-8 sm:my-0">
        
        {/* Header */}
        <h2 className='text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 sm:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 drop-shadow-sm' 
            style={{ fontFamily: "Rubik Puddles" }}>
          Join the Club
        </h2>

        <form className='w-full flex flex-col gap-4 sm:gap-5' onSubmit={handleSubmit(onSubmit)}>
          
          {/* Username Input */}
          <div className="group">
            <input
              type="text"
              placeholder='Cool Username'
              className='w-full bg-zinc-800/50 text-white border border-zinc-600 rounded-lg sm:rounded-xl p-3 sm:p-4 text-sm sm:text-base focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all duration-300 placeholder-zinc-500'
              style={{ fontFamily: "Poppins" }}
              {...register('userName', { required: true, minLength: 3 })}
            />
            {errors.userName && <span className='text-red-400 text-xs mt-1 pl-2 font-bold tracking-wide'>* Username required (min 3)</span>}
          </div>

          {/* Email Input */}
          <div className="group">
            <input
              type="email"
              placeholder='Email Address'
              className='w-full bg-zinc-800/50 text-white border border-zinc-600 rounded-lg sm:rounded-xl p-3 sm:p-4 text-sm sm:text-base focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all duration-300 placeholder-zinc-500'
              style={{ fontFamily: "Poppins" }}
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.email && <span className='text-red-400 text-xs mt-1 pl-2 font-bold tracking-wide'>* Valid email required</span>}
          </div>

          {/* Password Input */}
          <div className="group">
            <input
              type="password"
              placeholder='Secret Password'
              className='w-full bg-zinc-800/50 text-white border border-zinc-600 rounded-lg sm:rounded-xl p-3 sm:p-4 text-sm sm:text-base focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all duration-300 placeholder-zinc-500'
              style={{ fontFamily: "Poppins" }}
              {...register('password', { required: true, minLength: 6 })}
            />
            {errors.password && <span className='text-red-400 text-xs mt-1 pl-2 font-bold tracking-wide'>* Password too short (min 6)</span>}
          </div>
          
          {/* Submit Button */}
          <button 
            type="submit" 
            className='w-full bg-gradient-to-r from-green-600 to-green-500 text-black font-bold text-base sm:text-lg md:text-xl rounded-lg sm:rounded-xl p-3 sm:p-4 mt-3 sm:mt-4 shadow-lg hover:shadow-green-500/50 hover:scale-[1.02] active:scale-95 transition-all duration-300 ease-out'
            style={{ fontFamily: "Cabin Sketch" }}
          >
            LET'S GO
          </button>
        </form>

        <div className='mt-6 sm:mt-8 text-zinc-400 text-xs sm:text-sm text-center' style={{ fontFamily: "Poppins" }}>
          Already inside? <Link to="/login" className='text-green-400 font-bold hover:text-green-300 hover:underline transition-colors'>Log In</Link>
        </div>
      </div>
    </div>
  )
}

export default Signup