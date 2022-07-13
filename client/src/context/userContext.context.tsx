import React, { createContext, FC, useState } from "react";

/* interface IUserAction {
    type: USER_ACTIONS;
}

interface ISetUserAction extends IUserAction {
    payload: string;
}

interface ISelectUserAction extends IUserAction {
    payload: IUser;
}

type UserAction = ISetUserAction | ISelectUserAction; */

/* interface IUser {
    id: string;
    userName: string;
}

interface IUserContext {
    user: string;
    selectedUser: IUser;
}

const defaultState:IUserContext = {
    user: '',
    selectedUser: {id: '', userName: ''}
}

enum USER_ACTIONS {
    SET_USER = "SET_USER",
    SELECT_USER = "SELECT_USER"
}

export const setUserAction = (payload: string):ISetUserAction => ({type: USER_ACTIONS.SET_USER, payload});
export const selectUserAction = (payload: IUser):ISelectUserAction => ({type: USER_ACTIONS.SELECT_USER, payload});


function userReducer(state: IUserContext, action) {
    switch(action.type) {
        case USER_ACTIONS.SET_USER:
            return {...state, user: action.payload}
        case USER_ACTIONS.SELECT_USER:
            return {...state, selectedUser: action.payload}
        default:
            throw new Error(`Неизвестный тип действия: ${action.type}`)
    }
} */

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