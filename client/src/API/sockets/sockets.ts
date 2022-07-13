import { ErrorInfo, useState } from 'react';
import io from 'socket.io-client';
import { MessageTo } from '../../ts-features/interfaces';

export enum SocketEvents {
    CONNECT_ERROR = 'connect_error',
    PRIVATE_MESSAGE = 'private_message',
    USERS = 'users'
}

const socketServerURL = 'http://localhost:5000';
let socket = io(socketServerURL, {autoConnect: false});

socket.onAny((event, ...args) => {
    console.log(event, args);
});

export const connectToServer = (userName: string) => {
    socket.auth = {userName};
    socket.connect();
}

export const useSocketOnError = (event: SocketEvents) => {
    const [error, setError] = useState('');

    socket.on(event, (error) => {
        setError(error.message);
    })

    return error;
}

export const useSocketOnEvent = <T>(event: SocketEvents, initState: T) => {
    const [data, setData] = useState(initState);

    socket.on(event, (recievedData) => {
        setData(recievedData);
    })

    return data;
}

export const socketSendPrivateMessage = (data: MessageTo) => {
    socket.emit(SocketEvents.PRIVATE_MESSAGE, data);
}

/* export const socketOnConnectError = (setErrorFunc) => {
    socket.on("connect_error", (error) => {
        setErrorFunc(error.message);
    })
}

export const useSocketOn = (event, callback) => {
    const [result, setResult] = useState('');

    socket.on(event, () => {

    });
};
 */

/* export const socketEmit = (action, data) => {
    socket.emit(action, data);
}

export const socketJoinRoom = (userName, roomId) => {
    socket.emit("join_room", userName, roomId);
}

export const socketLogin = (userName, roomId) => {
    socket.emit("login", userName);
    socket.emit("join_room", userName, roomId);
}

export const socketSendMessage = (messageData) => {
    socket.emit("send_message", messageData);
}

export const socketRecieveMessage = (setMessagesFunc) => {
    socket.on("recieve_message", (message) => {
        setMessagesFunc((recievedMessages) => [...recievedMessages, message]);
    })
} */