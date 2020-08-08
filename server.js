const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const bodyparser = require('body-parser');
const messageStructure = require('./others/messages');
const {adduser, getcurrentuser} = require('./others/user');
const app = require('./app');

//setting body parser for URls in API
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

//for creating the server
const server = http.createServer(app);
const io = socketio(server);

//bot name for messages from ADMIN.
const bot = 'Admin';

//bring our static files to this server
app.use(express.static(path.join(__dirname, 'html_css')));

//to be executed when users connects

io.on('connection', socket => {
    socket.on('room_join', logged_user => {
    adduser(socket.id, logged_user);
    });

    //notifies that user is connected
    socket.emit('message', messageStructure(bot, 'you are connected.'));

    //notifies others that new users is connected now
    socket.broadcast.emit('message', messageStructure(bot, `User is connected now.`)
    );

    //when user got disconnected
    socket.on('disconnect', () => {
    const user = getcurrentuser(socket.id);
        io.emit('message', messageStructure(bot, `${user.username} is disconnected`));
    });

    //listen to incoming messages
    socket.on('chat-msg', msg => {
    const user = getcurrentuser(socket.id);
        socket.broadcast.emit('message', messageStructure(user.username, msg));
    })

});

//asking server to listen on the said port
const port = process.env.port || 5500;

//listen to running port for communication.
server.listen(port, () =>
    console.log(`Server is running on ${port}`));