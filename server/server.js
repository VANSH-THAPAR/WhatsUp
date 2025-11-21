const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors');
const { log } = require('console');
const app = express();
const port = 3000;
const CommunityChatRoom = require('./sockets/communityChatRoom');
const pool = require('./db/db');
const checkJwt = require('./middleware/checkJwt');
require('dotenv').config();
const cookieParser = require('cookie-parser');
    
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

CommunityChatRoom(io);

app.use('/',require('./routes/login'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/me',checkJwt, (req, res) => {
    try{
        res.status(200).json({
            userName: req.user.userName,
            email: req.user.email,
        })
    }catch(err){
        console.error('Error in /me route:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});