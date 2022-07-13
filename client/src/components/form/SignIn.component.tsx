import React, {ChangeEvent, FC, KeyboardEvent, MouseEvent, useState} from "react";
import { useContext } from "react";
import { connectToServer, SocketEvents, useSocketOnError } from "../../API/sockets/sockets";
import { IUserContext, UserContext } from "../../context/userContext.context";

const SignIn = () => {
    const {setUser} = useContext<IUserContext>(UserContext);
    const [userName, setUserName] = useState('');
    const signInError = useSocketOnError(SocketEvents.CONNECT_ERROR);

    const setUserNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    }

    const signIn = () => {
        connectToServer(userName);
        //localStorage.setItem("user", user);
        setUser(userName);
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") {
            signIn();
        }
    }

    return (
        <div>
            <input 
                type="text" 
                placeholder="Имя пользователя" 
                value={userName} 
                onChange={setUserNameHandler}
                onKeyDown={onKeyDownHandler}
            />
            <button onClick={signIn}>Войти</button>
            <h3>{signInError}</h3>
        </div>
    );
}

export default SignIn;