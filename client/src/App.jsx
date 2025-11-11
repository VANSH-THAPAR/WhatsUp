import React from 'react'
import {io} from 'socket.io-client'

const App = () => {
  const socket = io("http://localhost:3000");
  return (
    <div>Hi this is the react app !</div>
  )
}

export default App