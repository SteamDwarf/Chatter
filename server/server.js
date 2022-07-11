const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { addUser, deleteUser, getUsers, checkUniqUsername } = require("./users");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const PORT = 5000;

app.use(cors());
server.listen(PORT, () => {
    console.log(`Server is started on http://localhost:${PORT}`);
});

io.use((socket, next) => {
    const userName = socket.handshake.auth.userName;
    
    if(!userName) {
        return next(new Error("Введите имя пользователя."));
    }

    socket.userName = userName;
    next();
});

io.on("connection", (socket) => {
    console.log("Connected to server: ", socket.id);

    addUser({id: socket.id, userName: socket.userName});
    //socket.emit("users", getUsers());
    io.emit("users", getUsers());

    socket.on("disconnect", () => {
        console.log("Disconnected from server: ", socket.id);
        deleteUser(socket.id);
        socket.broadcast.emit("users", getUsers());
    });
    
    socket.on("login", (userName) => {
        console.log(userName, "signed in");
    });

    socket.on("join_room", (userName, roomId) => {
        try {
            addUser({id: socket.id, name: userName}, roomId);
            socket.join(roomId);
            console.log(userName, "joined to room ", roomId);
        } catch (error) {
            console.error(error);
        }
    });

    

    socket.on("send_message", (messageData) => {
        socket.to(messageData.room).emit("recieve_message", messageData.message);
    });

});