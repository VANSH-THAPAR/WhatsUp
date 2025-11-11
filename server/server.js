const express = require('express')
const {Server} = require('socket.io')
const {createServer} = require('http');
const cors = require('cors');
const app = express()
const port = 3000


const server = createServer(app);
const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"],
        credentials:true
    }
});

app.use(cors());

app.get('/', (req, res) => {
    res.send(`The backend server is live !`)
})

io.on("connection",(socket)=>{
    console.log("User connected with socket id : ",socket.id);
}); 


server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
