import path from "path";
import e, * as express from "express";
import * as http from "http";
import * as cors from "cors";
import { Server } from "socket.io";
import { addUser, connectUser, disconnectUser, findUser, getUsers, IUser} from "./users";
import {v4 as uuidv4} from 'uuid';
import { getMessages, saveMessage } from "./messages";

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


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["*"],
    },
});


const PORT = process.env.PORT || 5000;

export enum SocketEvents {
    CONNECT_ERROR = 'connect_error',
    PRIVATE_MESSAGE = 'private_message',
    USERS = 'users',
    GET_MESSAGES = 'get_messages'
}

app.use(cors());

if(process.env.NODE_ENV === 'production') {
    //app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', (req, res) => res.json({message: "Chatter work!"}));
}

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
        socket.emit(SocketEvents.GET_MESSAGES, getMessages(userName, contact));
    })

    socket.on("disconnect", () => {
        console.log("Disconnected from server: ", socket.handshake.auth.userName);
        
        disconnectUser(socket.handshake.auth.userName);
        socket.broadcast.emit(SocketEvents.USERS, getUsers());
    });
    
});