import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useRecievedMessage } from "../API/sockets/sockets";
import { IMessage, IUser } from "../ts-features/interfaces";
import { IUserContext, UserContext } from "./userContext.context";

export interface IMessagesContext {
    contactMessages: IMessage[];
    addMessage: (message: IMessage) => void;
    updateUserNewMessageState: (userName: string, state: boolean) => void;
}

const defaultState: IMessagesContext = {
    contactMessages: [],
    addMessage: (message) => null,
    updateUserNewMessageState: (userName, state) => null
}

export const MessagesContext = createContext(defaultState);

export const MessagesProvider = ({children}: {children: React.ReactNode}) => {
    const [messageData, setMessageData] = useRecievedMessage();
    const [contactMessages, setContactMessages] = useState<IMessage[]>([]);
    const {contacts, setContacts, user, selectedUser} = useContext<IUserContext>(UserContext);

    const updateUserNewMessageState = (userName: string, state: boolean) => {
        const sender = contacts.find(contact => contact.userName === userName) as IUser;
        const other = contacts.filter(contact => contact.userName !== userName);

        if(sender) sender.sentNewMessage = state;
        setContacts([...other, sender]);
    };

    const addMessage = (message: IMessage) => {
        setContactMessages([...contactMessages, message]);
    }


    const value = {
        contactMessages,
        addMessage,
        updateUserNewMessageState
    }

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


    return <MessagesContext.Provider value={value}>{children}</MessagesContext.Provider>
}