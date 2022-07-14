import React, { createContext, FC, useState } from "react";
import { MessageFrom } from "../ts-features/interfaces";

export interface IUser {
    id: string;
    userName: string;
    messages: MessageFrom[];
}

export interface IUserContext {
    user: string;
    selectedUser: IUser;
    contacts: IUser[];
    setContacts: (contacts: IUser[]) => void;
    setUser: (user: string) => void;
    setSelectedUser: (selectedUser: IUser) => void;
}

const defaultState: IUserContext = {
    user: '',
    selectedUser: {id: '', userName: '', messages: []},
    contacts: [],
    setContacts: (contacts) => null,
    setUser: (user) => null,
    setSelectedUser: (selectedUser) => null
}

export const UserContext = createContext<IUserContext>(defaultState);
export const UserConsumer = UserContext.Consumer;

export const UserProvider: FC<{children: React.ReactNode}> = ({children}) => {
    const [user, setUser] = useState<string>(defaultState.user);
    const [selectedUser, setSelectedUser] = useState<IUser>(defaultState.selectedUser);
    const [contacts, setContacts] = useState<IUser[]>(defaultState.contacts);

    const value: IUserContext = {user, selectedUser, contacts, setContacts, setUser, setSelectedUser}

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}