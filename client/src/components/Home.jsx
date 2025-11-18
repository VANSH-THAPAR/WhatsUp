import React from 'react'
import { Navigate, redirect, useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    // currently i am using local storage but later i will be using jwt tokens for storing user info as it helps in security

    function handlesubmit(e){
        e.preventDefault();
        const name = e.target[0].value;
        console.log(name);
        localStorage.setItem('userName' , name);
        navigate('/community');
    }

  return (
    <div className='w-screen min-h-screen flex justify-center items-center bg-zinc-900'>
        <div className='w-[30%] min-h-60 border border-slate-700 rounded-lg flex flex-col justify-evenly items-center gap-5 p-5'>
            <div className='text-3xl font-semibold text-green-500'>
                Enter your name to continue :
            </div>
            <form action="" onSubmit={handlesubmit} className='w-full flex justify-center border border-slate-700 px-3 py-2'>
                <input type="text" className='h-9.5 w-full text-green-200 items-center bg-zinc-900' placeholder='Enter your name : ' />
            </form>
        </div>
    </div>
  )
}

export default Home