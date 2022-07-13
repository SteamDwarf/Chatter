import React, { createContext, FC, useState } from "react";

export interface IUser {
    id: string;
    userName: string;
}

export interface IUserContext {
    user: string;
    selectedUser: IUser;
    setUser: (user: string) => void;
    setSelectedUser: (selectedUser: IUser) => void;
}

const defaultState: IUserContext = {
    user: '',
    selectedUser: {id: '', userName: ''},
    setUser: (user) => null,
    setSelectedUser: (selectedUser) => null
}

export const UserContext = createContext<IUserContext>(defaultState);
export const UserConsumer = UserContext.Consumer;

export const UserProvider: FC<{children: React.ReactNode}> = ({children}) => {
    const [user, setUser] = useState<string>(defaultState.user);
    const [selectedUser, setSelectedUser] = useState<IUser>(defaultState.selectedUser);

    const value: IUserContext = {user, selectedUser, setUser, setSelectedUser}

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}