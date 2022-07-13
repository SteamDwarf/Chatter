var express = require("express");
var http = require("http");
var cors = require("cors");
//const { Server } = require("socket.io");
import { Server } from "socket.io";
var _a = require("./users"), addUser = _a.addUser, deleteUser = _a.deleteUser, getUsers = _a.getUsers, checkUniqUsername = _a.checkUniqUsername;
var app = express();
var server = http.createServer(app);
var io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
var PORT = 5000;
app.use(cors());
server.listen(PORT, function () {
    console.log("Server is started on http://localhost:".concat(PORT));
});
io.use(function (socket, next) {
    var userName = socket.handshake.auth.userName;
    if (!userName) {
        return next(new Error("Введите имя пользователя."));
    }
    socket.handshake.auth.userName = userName;
    next();
});
io.on("connection", function (socket) {
    console.log("Connected to server: ", socket.id);
    addUser({ id: socket.id, userName: socket.handshake.auth.userName });
    //socket.emit("users", getUsers());
    io.emit("users", getUsers());
    socket.on("disconnect", function () {
        console.log("Disconnected from server: ", socket.id);
        deleteUser(socket.id);
        socket.broadcast.emit("users", getUsers());
    });
    socket.on("private_message", function (_a) {
        var message = _a.message, to = _a.to;
        socket.to(to).emit("private_message", { message: message, from: socket.handshake.auth.userName });
    });
    socket.on("login", function (userName) {
        console.log(userName, "signed in");
    });
    socket.on("join_room", function (userName, roomId) {
        try {
            addUser({ id: socket.id, name: userName }, roomId);
            socket.join(roomId);
            console.log(userName, "joined to room ", roomId);
        }
        catch (error) {
            console.error(error);
        }
    });
    socket.on("send_message", function (messageData) {
        socket.to(messageData.room).emit("recieve_message", messageData.message);
    });
});
//# sourceMappingURL=server.js.map