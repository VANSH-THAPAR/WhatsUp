const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors');
const { log } = require('console');
const app = express();
const port = 3000;
const CommunityChatRoom = require('./sockets/communityChatRoom');

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

CommunityChatRoom(io);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});