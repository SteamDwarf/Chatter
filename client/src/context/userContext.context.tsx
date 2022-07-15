import React, { createContext, FC, useEffect, useMemo, useState } from "react";
import { SocketEvents, useRecievedMessage, useSocketOnEvent } from "../API/sockets/sockets";
import { IMessage } from "../ts-features/interfaces";

export interface IUser {
    id: string;
    userName: string;
    messages: IMessage[];
    hasNewMessage: boolean;
}

export interface IUserContext {
    user: string;
    selectedUser: IUser;
    contacts: IUser[];
    messages: IMessage[];

    setUser: (user: string) => void;
    setSelectedUser: (selectedUser: IUser) => void;
    setContacts: (contacts: IUser[]) => void;
    setMessages: (messages: IMessage[]) => void;
    updateUserNewMessageState: (userName: string, state: boolean) => void
}

const defaultState: IUserContext = {
    user: '',
    selectedUser: {id: '', userName: '', messages: [], hasNewMessage: false},
    contacts: [],
    messages: [],

    setUser: (_user) => null,
    setSelectedUser: (_selectedUser) => null,
    setContacts: (_contacts) => null,
    setMessages: (_messages) => null,
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
    const [user, setUser] = useState<string>(defaultState.user);
    const [selectedUser, setSelectedUser] = useState<IUser>(defaultState.selectedUser);
    const [contacts, setContacts] = useSortedContacts([])
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [messageData, setMessageData] = useRecievedMessage() as [IMessage, React.Dispatch<React.SetStateAction<IMessage>>];
    const onlineUsers = useSocketOnEvent<IUser[]>(SocketEvents.USERS, []);

    const updateUserNewMessageState = (userName: string, state: boolean) => {
        const sender = contacts.find(contact => contact.userName === userName) as IUser;
        const other = contacts.filter(contact => contact.userName !== userName);

        if(sender) sender.hasNewMessage = state;
        setContacts([...other, sender]);
    };

    const value: IUserContext = {
        user, 
        selectedUser, 
        contacts, 
        messages, 
        setUser, 
        setSelectedUser, 
        setContacts,
        setMessages,
        updateUserNewMessageState
    }

    useEffect(() => {
        setContacts(onlineUsers);
    }, [onlineUsers]);

    useEffect(() => {
        if(messageData.id) {
            setMessages([...messages, {...messageData}]);

            if(messageData.from !== user && messageData.from !== selectedUser.userName) {
                updateUserNewMessageState(messageData.from, true);
            }

            setMessageData({id: '', content: '', from: '', to: '', date: ''});
        }
    }, [messageData]);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}