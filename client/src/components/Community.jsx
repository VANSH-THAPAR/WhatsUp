import React, { useEffect , useRef, useState } from 'react'
import { connectWS } from './Client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons'


const Community = () => {
    const socket = useRef(null);
    const [message,setMessage] = useState([]);
    const [text,setText] = useState('');
    const name = localStorage.getItem('userName');

    const handlechatsubmit = () => {
      const msg = {
        id: Date.now(),
        sender: name,
        text: text,
        ts: Date.now()
      }
      setMessage((m) => [...m, msg]);
      socket.current.emit('chatMessage',msg)
      setText('');
    }

    useEffect(() => {
        
        socket.current = connectWS();
        
        socket.current.on('connect' ,()=>{
            socket.current.emit('joinRoom' , name);
            socket.current.on('roomNotice',(userName)=>{
                console.log(`${userName} has joined the room`);
            })
            socket.current.on('chatMessage',(msg)=>{
              console.log(msg);
              setMessage((prev)=>[...prev,msg]);
            });
        });
        
    },[]);

  return (
    // <div>This is the Community page respected {name}</div>
    <>
    <div className='w-full h-full'>
      <div className='min-h-[90%] min-w-full'>
      {/* here the messages has to be added  */}
      {
        message.map((msg)=>{
          return <div key = {msg.id} className='bg-slate-300 text-black rounded-xl w-fit m-3 p-3'>
            <p className=''>{msg.sender}</p>
            <p className='font-bold text-xl'>{msg.text}</p>
          </div>
        })
      }
      </div>
      <div className='min-h-[10%] min-w-full'>
        <div className='border border-slate-700 rounded-4xl w-full p-5 flex justify-evenly items-center'>
          <input type="text" placeholder='Enter your message : ' className='w-[90%]' onChange={(e)=>{setText(e.target.value)}} value={text} />
          <button onClick={handlechatsubmit}><FontAwesomeIcon icon={faPaperPlane} className='text-2xl' /></button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Community