import { useEffect, useReducer, createContext } from "react";
import { connectToServer, socketEmit, socketLogin } from "../API/sockets/sockets";


const defaultState = {
    user: ''
}

const USER_ACTIONS = {
    SET_USER: "SET_USER"
}

export const setUserAction = (payload) => ({type: USER_ACTIONS.SET_USER, payload: payload});


function userReducer(state, action) {
    switch(action.type) {
        case USER_ACTIONS.SET_USER:
            return {...state, user: action.payload}
        default:
            throw new Error(`Неизвестный тип действия: ${action.type}`)
    }
}

export const UserContext = createContext(defaultState);

export const UserProvider = ({children}) => {
    const [state, dispatch] = useReducer(userReducer, defaultState);
    const value = {dispatch, state}

    /* const auth = () => {
        const user = localStorage.getItem('user');

        ioConnect();

        if(user) {
            dispatch(setUserAction(user));
            socketLogin(user, "123")
        }
    }

    useEffect(auth, []); */

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}