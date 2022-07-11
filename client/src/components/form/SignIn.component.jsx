import React, {useState} from "react";
import { useContext } from "react";
import { connectToServer, useSocketOnError } from "../../API/sockets/sockets";
import { setUserAction, UserContext } from "../../context/userContext.context";

const SignIn = () => {
    const {dispatch} = useContext(UserContext);
    const [user, setUser] = useState('');
    const signInError = useSocketOnError("connect_error");

    const setUserHandler = (e) => {
        setUser(e.target.value);
    }

    const signIn = () => {
        connectToServer(user);
        //socketLogin(user, "123");
        //localStorage.setItem("user", user);
        dispatch(setUserAction(user));
    }

    const onKeyDownHandler = (e) => {
        if(e.key === "Enter") {
            signIn();
        }
    }

    //socketOnConnectError(setSignInError);

    return (
        <div>
            <input 
                type="text" 
                placeholder="Имя пользователя" 
                value={user} 
                onChange={setUserHandler}
                onKeyDown={onKeyDownHandler}
            />
            <button onClick={signIn}>Войти</button>
            <h3>{signInError}</h3>
        </div>
    );
}

export default SignIn;