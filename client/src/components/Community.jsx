import React, { useEffect, useRef, useState } from 'react'
import { connectWS } from './Client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'


const Community = () => {
  const socket = useRef(null);
  const [message, setMessage] = useState([]);
  const [text, setText] = useState('');
  const name = localStorage.getItem('userName');

  const handlechatsubmit = () => {
    const msg = {
      id: Date.now(),
      sender: name,
      text: text,
      ts: Date.now(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setMessage((m) => [...m, msg]);
    socket.current.emit('chatMessage', msg)
    setText('');
  }

  useEffect(() => {

    socket.current = connectWS();

    const handleMessage = () => {
      setMessage((prev) => [...prev, msg])
    }

    socket.current.on('connect', () => {
      socket.current.emit('joinRoom', name);
      socket.current.on('roomNotice', (userName) => {
        console.log(`${userName} has joined the room`);
      })
      socket.current.on('chatMessage', (msg) => {
        console.log(msg);
        setMessage((prev) => [...prev, msg]);
      });
    });
    return () => {
      if (socket.current) {
        socket.current.off('chatMessage', handleMessage)
        socket.current.disconnect();
      }
    }
  }, []);

  return (
    // <div>This is the Community page respected {name}</div>
    <>
      <div className='w-full h-full'>
        <div className='h-[90%] min-w-full overflow-y-auto'>
          {/* here the messages has to be added  */}
          {
            message.map((msg) => {
              const isMe = msg.sender === name;
              return <div key={msg.id} className={`flex w-full ${isMe ? 'justify-end ' : ' justify-start'}`}>
                <div className='bg-slate-300 text-black rounded-xl w-fit m-3 p-3 min-w-40 max-w-[40%]  flex flex-col gap-2'>
                  <div className='flex gap-5 justify-between items-center'>
                    <p className={`${isMe ? "text-blue-600":"text-red-600"} font-bold`}>
                      {msg.sender}</p>
                    <p className='text-[12px]'>{msg.time}</p>
                  </div>
                  <p style={{ fontFamily: "poppins" }} className='font-semibold text-xl h-fit w-full wrap-break-word whitespace-pre-wrap leading-snug '>{msg.text}</p>
                </div>
              </div>
            })
          }
        </div>
        <div className='min-h-[10%] min-w-full'>
          <div className='border border-slate-700 rounded-4xl w-full p-5 flex justify-evenly items-center '>
            <input type="text" placeholder='Enter your message : ' className='w-[90%] outline-none ' onChange={(e) => { setText(e.target.value) }} value={text} onKeyDown={(e) => e.key == 'Enter' && handlechatsubmit()} />
            <button onClick={handlechatsubmit}><FontAwesomeIcon icon={faPaperPlane} className='text-2xl' /></button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Community