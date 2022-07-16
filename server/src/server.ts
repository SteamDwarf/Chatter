import * as express from "express";
import * as http from "http";
import * as cors from "cors";
import { Server } from "socket.io";
import { addUser, deleteUser, getUsers } from "./users";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const PORT = 5000;

export enum SocketEvents {
    CONNECT_ERROR = 'connect_error',
    PRIVATE_MESSAGE = 'private_message',
    USERS = 'users'
}

app.use(cors());
server.listen(PORT, () => {
    console.log(`Server is started on http://localhost:${PORT}`);
});

io.use((socket, next) => {
    const userName = socket.handshake.auth.userName;
    
    if(!userName) {
        return next(new Error("Введите имя пользователя."));
    }

    socket.handshake.auth.userName = userName;
    next();
});

io.on("connection", (socket) => {
    console.log("Connected to server: ", socket.id);

    addUser({
        id: socket.id, 
        userName: socket.handshake.auth.userName, 
        messages: [],
        sentNewMessage: false,
        color: socket.handshake.auth.color
    });
    //socket.emit("users", getUsers());
    io.emit(SocketEvents.USERS, getUsers());

    socket.on("disconnect", () => {
        console.log("Disconnected from server: ", socket.id);
        deleteUser(socket.id);
        socket.broadcast.emit(SocketEvents.USERS, getUsers());
    });
    
    socket.on(SocketEvents.PRIVATE_MESSAGE, (messageData) => {
        console.log(messageData);
        socket.to(messageData.to).emit(SocketEvents.PRIVATE_MESSAGE, messageData);
    });


/*     socket.on("login", (userName) => {
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
    }); */

    

    /* socket.on("send_message", (messageData) => {
        socket.to(messageData.room).emit("recieve_message", messageData.message);
    }); */

});