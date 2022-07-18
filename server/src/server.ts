import * as express from "express";
import * as http from "http";
import * as cors from "cors";
import { Server } from "socket.io";
import { addUser, connectUser, disconnectUser, findUser, getUsers, IUser} from "./users";
import {v4 as uuidv4} from 'uuid';
import { getMessages, saveMessage } from "./messages";

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
    USERS = 'users',
    GET_MESSAGES = 'get_messages'
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

    next();
});

io.on("connection", (socket) => {
    console.log("Connected to server: ", socket.handshake.auth.userName);

    let connectingUser = findUser(socket.handshake.auth.userName);

    if(!connectingUser) {
        const userID = uuidv4();
        
        connectingUser = {
            id: userID,
            userName: socket.handshake.auth.userName,
            sentNewMessage: false,
            color: socket.handshake.auth.color,
            isOnline: false
        }

        addUser(connectingUser);

    }
    
    connectUser(connectingUser);
    socket.join(connectingUser.userName);
    io.emit(SocketEvents.USERS, getUsers());
    io.to(connectingUser.userName).emit('connection', connectingUser);

    socket.on(SocketEvents.PRIVATE_MESSAGE, (messageData) => {
        socket.to(messageData.to).emit(SocketEvents.PRIVATE_MESSAGE, messageData);
        saveMessage(messageData);
    });

    socket.on(SocketEvents.GET_MESSAGES, (userName, contact) => {
        //socket.to(userName).emit(SocketEvents.GET_MESSAGES, getMessages(userName, contact));
        socket.emit(SocketEvents.GET_MESSAGES, getMessages(userName, contact));
    })

    socket.on("disconnect", () => {
        console.log("Disconnected from server: ", socket.handshake.auth.userName);
        
        disconnectUser(socket.handshake.auth.userName);
        socket.broadcast.emit(SocketEvents.USERS, getUsers());
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