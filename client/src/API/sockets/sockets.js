import { useState } from 'react';
import io from 'socket.io-client';

const socketServerURL = 'http://localhost:5000';
let socket = io(socketServerURL, {autoConnect: false});

socket.onAny((event, ...args) => {
    console.log(event, args);
});

export const connectToServer = (userName) => {
    socket.auth = {userName};
    socket.connect();
}

export const useSocketOnError = (event) => {
    const [error, setError] = useState('');

    socket.on(event, (error) => {
        setError(error.message);
    })

    return error;
}

export const useSocketOnEvent = (event, initState) => {
    const [data, setData] = useState(initState);

    socket.on(event, (recievedData) => {
        setData(recievedData);
    })

    return data;
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

export const socketEmit = (action, data) => {
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
}