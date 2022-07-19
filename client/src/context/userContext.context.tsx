import React, { createContext, FC, useEffect, useState } from "react";
import { SocketEvents, useContactMessages, useRecievedMessage, useSocketOnConnect, useSocketOnEvent } from "../API/sockets/sockets";
import { THEMES } from "../ts-features/enums";
import { defaultUser, IMessage, IUser } from "../ts-features/interfaces";

export interface IUserContext {
    user: IUser;
    selectedUser: IUser;
    contacts: IUser[];
    isLogsIn: boolean;
    contactMessages: IMessage[];
    theme: THEMES;

    setUser: (user: IUser) => void;
    setSelectedUser: (selectedUser: IUser) => void;
    setContacts: (contacts: IUser[]) => void;
    addMessage: (messages: IMessage) => void;
    updateUserNewMessageState: (userName: string, state: boolean) => void;
    setIsLogsIn: (state: boolean) => void;
    setTheme: (theme: THEMES) => void;
}


const defaultState: IUserContext = {
    user: defaultUser,
    selectedUser: defaultUser,
    contacts: [],
    isLogsIn: false,
    contactMessages: [],
    theme: THEMES.LIGHT,

    setUser: (_user) => null,
    setSelectedUser: (_selectedUser) => null,
    setContacts: (_contacts) => null,
    addMessage: (_messages) => null,
    updateUserNewMessageState: (_userName, _state) => null,
    setIsLogsIn: (_state) => null,
    setTheme: (_theme) => null
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
    const [contactMessages, setContactMessages] = useContactMessages();
    const [theme, setTheme] = useState<THEMES>(THEMES.LIGHT);

    const updateUserNewMessageState = (userName: string, state: boolean) => {
        const sender = contacts.find(contact => contact.userName === userName) as IUser;
        const other = contacts.filter(contact => contact.userName !== userName);

        if(sender) sender.sentNewMessage = state;
        setContacts([...other, sender]);
    };

    const addMessage = (message: IMessage) => {
        setContactMessages([...contactMessages, message]);
    }

    const value: IUserContext = {
        user, 
        selectedUser, 
        contacts, 
        isLogsIn,
        contactMessages,
        theme,

        setUser, 
        setSelectedUser, 
        setContacts,
        addMessage,
        updateUserNewMessageState,
        setIsLogsIn,
        setTheme
    }

    useEffect(() => {
        setContacts(onlineUsers);
    }, [onlineUsers]);

    useEffect(() => {

        if(messageData) {

            if(messageData.from !== user.userName && messageData.from !== selectedUser.userName) {
                updateUserNewMessageState(messageData.from, true);
            } 

            if(messageData.from === selectedUser.userName || (messageData.from === user.userName && messageData.to === selectedUser.userName)) {
                addMessage(messageData);
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