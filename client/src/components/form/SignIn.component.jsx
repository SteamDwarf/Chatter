import React, {useState} from "react";
import { ioConnect } from "../../API/sockets/sockets";

const SignIn = ({setAuthFunc}) => {
    const [user, setUser] = useState('');

    const setUserHandler = (e) => {
        setUser(e.target.value);
    }

    const signIn = () => {
        ioConnect();
        localStorage.setItem("user", user);
        setAuthFunc(true);
    }

    return (
        <div>
            <input type="text" placeholder="Имя пользователя" value={user} onChange={setUserHandler}/>
            <button onClick={signIn}>Войти</button>
        </div>
    );
}

export default SignIn;