import React, { createContext, FC, useEffect, useMemo, useState } from "react";
import { SocketEvents, useRecievedMessage, useSocketOnEvent } from "../API/sockets/sockets";
import { IMessage } from "../ts-features/interfaces";

export interface IUser {
    id: string;
    userName: string;
    messages: IMessage[];
    sentNewMessage: boolean;
    color: string;
}

//TODO убрать состояние messages и перенести его в состояние user

export interface IUserContext {
    user: IUser;
    selectedUser: IUser;
    contacts: IUser[];

    setUser: (user: IUser) => void;
    setSelectedUser: (selectedUser: IUser) => void;
    setContacts: (contacts: IUser[]) => void;
    addMessage: (messages: IMessage) => void;
    updateUserNewMessageState: (userName: string, state: boolean) => void
}

export const defaultUser: IUser = {id: '', userName: '', messages: [], sentNewMessage: false, color: 'white'};

const defaultState: IUserContext = {
    user: defaultUser,
    selectedUser: defaultUser,
    contacts: [],

    setUser: (_user) => null,
    setSelectedUser: (_selectedUser) => null,
    setContacts: (_contacts) => null,
    addMessage: (_messages) => null,
    updateUserNewMessageState: (_userName, _state) => null
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
export const UserConsumer = UserContext.Consumer;

export const UserProvider: FC<{children: React.ReactNode}> = ({children}) => {
    const [user, setUser] = useState<IUser>(defaultUser);
    const [selectedUser, setSelectedUser] = useState<IUser>(defaultState.selectedUser);
    const [contacts, setContacts] = useSortedContacts([])
    const [messageData, setMessageData] = useRecievedMessage() as [IMessage, React.Dispatch<React.SetStateAction<IMessage>>];
    const onlineUsers = useSocketOnEvent<IUser[]>(SocketEvents.USERS, []);

    const updateUserNewMessageState = (userName: string, state: boolean) => {
        const sender = contacts.find(contact => contact.userName === userName) as IUser;
        const other = contacts.filter(contact => contact.userName !== userName);

        if(sender) sender.sentNewMessage = state;
        setContacts([...other, sender]);
    };

    const addMessage = (message:IMessage) => {
        setUser({...user, messages: [...user.messages, {...message}]});
    }

    const value: IUserContext = {
        user, 
        selectedUser, 
        contacts, 
        setUser, 
        setSelectedUser, 
        setContacts,
        addMessage,
        updateUserNewMessageState
    }

    useEffect(() => {
        setContacts(onlineUsers);
    }, [onlineUsers]);

    useEffect(() => {
        if(messageData.id) {
            addMessage(messageData);

            if(messageData.from !== user.userName && messageData.from !== selectedUser.userName) {
                updateUserNewMessageState(messageData.from, true);
            }

            setMessageData({id: '', content: '', from: '', to: '', date: ''});
        }
    }, [messageData]);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}