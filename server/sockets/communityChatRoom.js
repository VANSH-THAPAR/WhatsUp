const room = 'main-room';
/**
 * Sets up all Socket.IO event listeners.
 * @param {import('socket.io').Server} io The Socket.IO server instance.
 */
const CommunityChatRoom = (io) => {
    io.on('connection',(socket)=>{
        console.log(`User connected: ${socket.id}`);
    
        socket.on('joinRoom' , async (userName)=>{
            console.log(`${userName} is joining the room`);
    
            await socket.join(room);
    
            // sending the connected user to all users
            // io.to(room).emit('roomNotice' , userName);\
            
            // sending the connected user message to add user except the connected user using broadcast
            socket.to(room).emit('roomNotice', userName);
    
            // socket.on('disconnect',()=>{
            //     console.log(`user got disconnected:${socket.id}`);
            // })
        })
        socket.on('chatMessage', (msg)=>{
            socket.to(room).emit('chatMessage', msg);
        })
    
        // socket.on('new-user-joined',(name)=>{
        //     users[socket.id] = name;
        //     socket.broadcast.emit('user-joined',name);
        // });
    
        // socket.on('send',(message)=>{
        //     socket.broadcast.emit('receive',{message: message, name: users[socket.id]});
        // });
    })
}

module.exports = CommunityChatRoom;