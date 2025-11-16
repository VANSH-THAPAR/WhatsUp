import React, { useEffect , useRef } from 'react'
import { connectWS } from './Client';


const Community = () => {
    const socket = useRef(null);

    useEffect(() => {
        socket.current = connectWS();
        socket.current.on('connect' ,()=>{
            socket.current.emit('joinRoom' , localStorage.getItem('userName'));

        });
        
    }, []);

  return (
    <div>This is the Community page respected {localStorage.getItem('userName')}</div>
  )
}

export default Community