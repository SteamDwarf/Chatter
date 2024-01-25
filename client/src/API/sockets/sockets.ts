import { useState } from 'react';
import io from 'socket.io-client';
import { IMessage} from '../../ts-features/interfaces';

export enum SocketEvents {
    CONNECT_ERROR = 'connect_error',
    CONNECT_FAILED = 'CONNECT_FAILED',
    PRIVATE_MESSAGE = 'private_message',
    CONNECTION = 'connection',
    USERS = 'users',
    GET_MESSAGES = 'get_messages'
}

/* const socketServerURL = 'https://chatter-ds-server.herokuapp.com'; */
//const socketServerURL = 'http://localhost:5000';
const socketServerURL = 'https://chatter-u930.onrender.com';
let socket = io(socketServerURL, {autoConnect: false});

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

    socket.on(event, (recievedData: any) => {
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

export const useContactMessages = (): [IMessage[], (message: IMessage[]) => void] => {
    const [contactMessages, setContactMessages] = useState<IMessage[]>([]);

    socket.on(SocketEvents.GET_MESSAGES, (recievedMessages) => {
        setContactMessages(recievedMessages);
    })

    return [contactMessages, setContactMessages];
}


export const socketSendPrivateMessage = (data: IMessage) => {
    socket.emit(SocketEvents.PRIVATE_MESSAGE, data);
}

export const socketGetContactMessages = (userName: string, contactName: string) => {
    socket.emit(SocketEvents.GET_MESSAGES, userName, contactName);
}