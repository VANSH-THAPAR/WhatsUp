import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom'

const Login = () => {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => 
  {
    // this is the data of the user , use this and send it to the server to create a new user
    console.log(data);
  }
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className="w-[30%] h-[40%] bg-white rounded-lg shadow-lg flex flex-col justify-center items-center">
        <h2 className='text-3xl font-bold mb-6'>Log In</h2>
        <form className='w-[80%] flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder='Email'
            className='border border-gray-300 rounded-md p-2'
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && <span className='text-red-500'>Valid email is required</span>}

          <input
            type="password"
            placeholder='Password'
            className='border border-gray-300 rounded-md p-2'
            {...register('password', { required: true, minLength: 6 })}
          />
          {errors.password && <span className='text-red-500'>Password is required (min 6 characters)</span>}
          
          <button type="submit" className='bg-blue-500 text-white rounded-md p-2 mt-4 hover:bg-blue-600 transition-colors duration-300'>Create Account</button>
        </form>
        <div className='mt-5'>
          Don't have an account? <Link to="/signup" className='text-blue-500 hover:underline'>Sign Up</Link>
        </div>
      </div>
    </div>
  )
}

export default Login 