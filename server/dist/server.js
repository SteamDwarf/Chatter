"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http = require("http");
var cors = require("cors");
var socket_io_1 = require("socket.io");
var users_1 = require("./users");
var uuid_1 = require("uuid");
var messages_1 = require("./messages");
var enums_1 = require("./enums");
var path = require("path");
var dotenv = require('dotenv').config();
/* const whitelist = [
    'http://localhost:5000',
    'http://localhost:8080',
    'http://localhost:10000',
    'https://steamdwarf.github.io/Chatter-frontend'
]
const corsOptions = {
    origin: (origin: any, callback: any) => {
        console.log('Origin of request ', origin);
        if(whitelist.indexOf(origin) !== -1 || !origin) {
            console.log('Origin acceptable');
            callback(null, true);
        } else {
            console.log('Origin rejected');
            callback(new Error('Not allowed by CORS'));
        }
    }
} */
var PORT = process.env.PORT || 5000;
var app = express();
var server = http.createServer(app);
var io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});
/* if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'client/build')));
} */
app.use(cors());
app.use(express.static(path.resolve(__dirname, '../../client/build')));
app.get('/', function (req, res) { return res.sendFile(path.resolve(__dirname, '../../client/build/index.html')); });
server.listen(PORT, function () {
    console.log("Server is started on http://localhost:".concat(PORT));
});
io.use(function (socket, next) {
    var userName = socket.handshake.auth.userName;
    if (!userName) {
        return next(new Error("Введите имя пользователя."));
    }
    next();
});
io.on("connection", function (socket) {
    console.log("Connected to server: ", socket.handshake.auth.userName);
    var connectingUser = (0, users_1.findUser)(socket.handshake.auth.userName);
    if (!connectingUser) {
        var userID = (0, uuid_1.v4)();
        connectingUser = {
            id: userID,
            userName: socket.handshake.auth.userName,
            sentNewMessage: false,
            color: socket.handshake.auth.color,
            isOnline: false
        };
        (0, users_1.addUser)(connectingUser);
    }
    (0, users_1.connectUser)(connectingUser);
    socket.join(connectingUser.userName);
    io.emit(enums_1.SocketEvents.USERS, (0, users_1.getUsers)());
    io.to(connectingUser.userName).emit('connection', connectingUser);
    socket.on(enums_1.SocketEvents.PRIVATE_MESSAGE, function (messageData) {
        socket.to(messageData.to).emit(enums_1.SocketEvents.PRIVATE_MESSAGE, messageData);
        (0, messages_1.saveMessage)(messageData);
    });
    socket.on(enums_1.SocketEvents.GET_MESSAGES, function (userName, contact) {
        socket.emit(enums_1.SocketEvents.GET_MESSAGES, (0, messages_1.getMessages)(userName, contact));
    });
    socket.on("disconnect", function () {
        console.log("Disconnected from server: ", socket.handshake.auth.userName);
        (0, users_1.disconnectUser)(socket.handshake.auth.userName);
        socket.broadcast.emit(enums_1.SocketEvents.USERS, (0, users_1.getUsers)());
    });
});
//# sourceMappingURL=server.js.map