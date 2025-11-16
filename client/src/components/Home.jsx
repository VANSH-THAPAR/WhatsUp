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
    <div>
        <div>
            enter your name
        </div>
        <form action="" onSubmit={handlesubmit}>
            <input type="text" />
        </form>
    </div>
  )
}

export default Home