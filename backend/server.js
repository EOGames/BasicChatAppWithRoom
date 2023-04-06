const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const http = require('http').Server(app);
const io = require('socket.io')(http,{
    cors:
    {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"]
    }
});

io.on('connection',(socket)=>
{
    console.log('User Connected');

    socket.on('disconnect',(socket)=>
    {
        console.log(' User disconnected');
    });

    socket.on('join',(roomName)=>
    {
        console.log('RoomName Joined:'+roomName);
        socket.join(roomName);
    });

    socket.on('msg',(message,roomName) =>
    {
        console.log('MSG Received: '+ message);
        io.sockets.to(roomName).emit('room-msg',message);
    });

});

http.listen(5000,()=>{
    console.log("Server Up and Running On Port 5000");
});