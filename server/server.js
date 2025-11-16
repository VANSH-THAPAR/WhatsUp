const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

const room = 'main-room';

io.on('connection',(socket)=>{
    console.log(`User connected: ${socket.id}`);

    socket.on('joinRoom' , async (userName)=>{
        console.log(`${userName} is joining the room`);

        await socket.join(room);
    })


    // socket.on('new-user-joined',(name)=>{
    //     users[socket.id] = name;
    //     socket.broadcast.emit('user-joined',name);
    // });

    // socket.on('send',(message)=>{
    //     socket.broadcast.emit('receive',{message: message, name: users[socket.id]});
    // });
})

app.get('/', (req, res) => {
    res.send('Hello World!');
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});