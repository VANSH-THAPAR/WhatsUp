import React from 'react'
import { useEffect } from 'react';
import {io} from 'socket.io-client'

const App = () => {

  const socket = io("http://localhost:3000");
  

  useEffect(()=>{
    
    socket.on("connection",()=>{
      console.log("Connected to the server with socket id : ",socket.id);
    })

    socket.on("welcome",(message)=>{
      console.log(message);
    })

  },[]);

  
  return (
    <div>Hi this is the react app !</div>
  )
}

export default App