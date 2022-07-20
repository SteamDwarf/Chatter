"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketEvents = void 0;
var path_1 = require("path");
var express = require("express");
var http = require("http");
var cors = require("cors");
var socket_io_1 = require("socket.io");
var users_1 = require("./users");
var uuid_1 = require("uuid");
var messages_1 = require("./messages");
/* const whitelist = ['http://localhost:5000', 'http://localhost:8080', 'https://chatter-ds.herokuapp.com']
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
var app = express();
var server = http.createServer(app);
var io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
var PORT = process.env.PORT || 5000;
var SocketEvents;
(function (SocketEvents) {
    SocketEvents["CONNECT_ERROR"] = "connect_error";
    SocketEvents["PRIVATE_MESSAGE"] = "private_message";
    SocketEvents["USERS"] = "users";
    SocketEvents["GET_MESSAGES"] = "get_messages";
})(SocketEvents = exports.SocketEvents || (exports.SocketEvents = {}));
app.use(cors());
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path_1.default.join(__dirname, 'client/build')));
    app.get('*', function (req, res) { return res.sendFile(path_1.default.join(__dirname + 'client/build/index.html')); });
}
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
    io.emit(SocketEvents.USERS, (0, users_1.getUsers)());
    io.to(connectingUser.userName).emit('connection', connectingUser);
    socket.on(SocketEvents.PRIVATE_MESSAGE, function (messageData) {
        socket.to(messageData.to).emit(SocketEvents.PRIVATE_MESSAGE, messageData);
        (0, messages_1.saveMessage)(messageData);
    });
    socket.on(SocketEvents.GET_MESSAGES, function (userName, contact) {
        socket.emit(SocketEvents.GET_MESSAGES, (0, messages_1.getMessages)(userName, contact));
    });
    socket.on("disconnect", function () {
        console.log("Disconnected from server: ", socket.handshake.auth.userName);
        (0, users_1.disconnectUser)(socket.handshake.auth.userName);
        socket.broadcast.emit(SocketEvents.USERS, (0, users_1.getUsers)());
    });
});
//# sourceMappingURL=server.js.map