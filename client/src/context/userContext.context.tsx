import React, { createContext, FC, useEffect, useMemo, useState } from "react";
import { SocketEvents, useRecievedMessage, useSocketOnConnect, useSocketOnEvent } from "../API/sockets/sockets";
import { IMessage } from "../ts-features/interfaces";

export interface IUserMessages {
    userName: string;
    messages: IMessage[];
}

export interface IUser {
    id: string;
    userName: string;
    //messages: IMessage[];
    messages: IUserMessages[];
    sentNewMessage: boolean;
    color: string;
    isOnline: boolean;
}

export const defaultUser: IUser = {
    id: '', 
    userName: '', 
    //messages: [], 
    messages: [],
    sentNewMessage: false, 
    color: 'white', 
    isOnline: false
};

//TODO убрать состояние messages и перенести его в состояние user

export interface IUserContext {
    user: IUser;
    selectedUser: IUser;
    contacts: IUser[];
    isLogsIn: boolean;

    setUser: (user: IUser) => void;
    setSelectedUser: (selectedUser: IUser) => void;
    setContacts: (contacts: IUser[]) => void;
    addMessage: (messages: IMessage) => void;
    updateUserNewMessageState: (userName: string, state: boolean) => void;
    setIsLogsIn: (state: boolean) => void;
}


const defaultState: IUserContext = {
    user: defaultUser,
    selectedUser: defaultUser,
    contacts: [],
    isLogsIn: false,

    setUser: (_user) => null,
    setSelectedUser: (_selectedUser) => null,
    setContacts: (_contacts) => null,
    addMessage: (_messages) => null,
    updateUserNewMessageState: (_userName, _state) => null,
    setIsLogsIn: (_state) => null
}

const useSortedContacts = (contacts: IUser[]): [IUser[], (contacts: IUser[]) => void] => {
    const [sortedContacts, setSortedContacts] = useState<IUser[]>(contacts);

    const setSortedContactsRes = (contacts: IUser[]) => {
        const sortedContactsRes = contacts.sort((prev: IUser, cur: IUser) => {
            if(prev.userName < cur.userName) return -1;
            if(prev.userName > cur.userName) return 1;
            return 0;
        });
    
        setSortedContacts(sortedContactsRes);
    }

    //Может пригодиться
    //setSortedContacts(contacts)

    return [sortedContacts, setSortedContactsRes];
}

export const UserContext = createContext<IUserContext>(defaultState);

export const UserProvider: FC<{children: React.ReactNode}> = ({children}) => {
    const [user, setUser] = useState<IUser>(defaultUser);
    const [selectedUser, setSelectedUser] = useState<IUser>(defaultState.selectedUser);
    const [contacts, setContacts] = useSortedContacts([])
    const [messageData, setMessageData] = useRecievedMessage();
    const [isLogsIn, setIsLogsIn] = useState(false);
    const onlineUsers = useSocketOnEvent<IUser[]>(SocketEvents.USERS, []);
    const userData = useSocketOnConnect();

    const updateUserNewMessageState = (userName: string, state: boolean) => {
        const sender = contacts.find(contact => contact.userName === userName) as IUser;
        const other = contacts.filter(contact => contact.userName !== userName);

        if(sender) sender.sentNewMessage = state;
        setContacts([...other, sender]);
    };

    const addMessage = (message: IMessage) => {
        //setUser({...user, messages: [...user.messages, {...message}]});

        const contactName = message.from !== user.userName ? message.from : message.to;
        const contactMessagesObj = user.messages.find(mesObj => mesObj.userName === contactName);
        const otherMessages = user.messages.filter(mesObj => mesObj.userName !== contactName);

        if(contactMessagesObj) {
            contactMessagesObj.messages.push(message);
            setUser({...user, messages: [...otherMessages, contactMessagesObj]});
            return;
        }
        
        setUser({...user, messages: [...user.messages, {userName: contactName, messages: [message]}]});
    }

    const value: IUserContext = {
        user, 
        selectedUser, 
        contacts, 
        isLogsIn,
        setUser, 
        setSelectedUser, 
        setContacts,
        addMessage,
        updateUserNewMessageState,
        setIsLogsIn
    }

    useEffect(() => {
        setContacts(onlineUsers);
    }, [onlineUsers]);

    useEffect(() => {
        console.log(messageData);
        if(messageData) {
            addMessage(messageData);

            if(messageData.from !== user.userName && messageData.from !== selectedUser.userName) {
                updateUserNewMessageState(messageData.from, true);
            }

            setMessageData(null);
        }
    }, [messageData]);

    useEffect(() => {
        if(userData) {
            setUser(userData);
            setIsLogsIn(false);
        }
    }, [userData]);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}