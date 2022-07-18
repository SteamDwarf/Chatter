import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import { useContext } from "react";
import { connectToServer, SocketEvents, useSocketOnError } from "../../API/sockets/sockets";
import { defaultUser, IUserContext, UserContext } from "../../context/userContext.context";
import Button from "../../UI/button/Button.ui";
import Container from "../../UI/container/Container";
import Input from "../../UI/input/Input.ui";
import classes from './SignIn.module.css';

const colors = ['red', 'green', 'purple', 'blue'];

const SignIn = () => {
    const {isLogsIn, setIsLogsIn} = useContext<IUserContext>(UserContext);
    const [userName, setUserName] = useState('');
    const signInError = useSocketOnError();

    const setUserNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    }

    const signIn = () => {
        const colorId = Math.round(Math.random() * (colors.length - 1));
        const color = colors[colorId];

        connectToServer(userName, color);
        setIsLogsIn(true);
        //localStorage.setItem("user", user);
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") {
            signIn();
        }
    }

    return (
        <Container contentPosition="center-center" height="fullHeight">
            <div className={classes.signInForm}>
                <h2 className={classes.signInFormTitle}>Добро пожаловать в Chatter</h2>
                <Input
                    type="text" 
                    placeholder="Имя пользователя" 
                    value={userName} 
                    valueSetter={setUserName}
                    onChange={setUserNameHandler}
                    onKeyDown={onKeyDownHandler}
                    width='full'
                    size="medium"
                    rounded="low-smooth"
                />
                <Button onClick={signIn} size='medium' rounded="low-smooth" width="full">Войти</Button>
                <h4>{signInError}</h4>
                { isLogsIn && !signInError ? <h4>Подождите...</h4> : null}
            </div>
        </Container>
    );
}

export default SignIn;