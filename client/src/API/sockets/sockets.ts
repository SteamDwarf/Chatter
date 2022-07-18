import { ErrorInfo, useState } from 'react';
import io from 'socket.io-client';
import { IMessage} from '../../ts-features/interfaces';

export enum SocketEvents {
    CONNECT_ERROR = 'connect_error',
    CONNECT_FAILED = 'CONNECT_FAILED',
    PRIVATE_MESSAGE = 'private_message',
    CONNECTION = 'connection',
    USERS = 'users'
}

const socketServerURL = 'http://localhost:5000';
let socket = io(socketServerURL, {autoConnect: false});

socket.onAny((event, ...args) => {
    console.log(event, args);
});

export const connectToServer = (userName: string, color: string) => {
    socket.auth = {userName, color};
    socket.connect();
}

export const useSocketOnConnect = () => {
    const [userData, setUserData] = useState(null);

    socket.on(SocketEvents.CONNECTION, (user) => {
        setUserData(user);
    });

    return userData;
}

export const useSocketOnError = () => {
    const [error, setError] = useState('');

    socket.on(SocketEvents.CONNECT_ERROR, (error) => {
        setError(error.message);
    });

    socket.on(SocketEvents.CONNECT_FAILED, (error) => {
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

export const useRecievedMessage = (): [IMessage | null, (message: IMessage | null) => void] => {
    const [data, setData] = useState<IMessage | null>(null);

    socket.on(SocketEvents.PRIVATE_MESSAGE, (recievedData) => {
        setData(recievedData);
    })

    return [data, setData];
}


export const socketSendPrivateMessage = (data: IMessage) => {
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