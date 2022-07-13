import React, {ChangeEvent, FC, KeyboardEvent, MouseEvent, useState} from "react";
import { useContext } from "react";
import { connectToServer, SocketEvents, useSocketOnError } from "../../API/sockets/sockets";
import { IUserContext, UserContext } from "../../context/userContext.context";
import Button from "../../UI/button/Button.ui";
import Container from "../../UI/container/Container";
import Input from "../../UI/input/Input.ui";

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
        <Container contentPosition="center-center" heightType="fullHeight">
            <Container 
                widthType="halfWidth" 
                heightType="quartHeight" 
                typeDirection="column" 
                contentRarity="space-around"
                contentPosition="center-center"
                shadow="volume"
            >
                <h1>Добро пожаловать в Chatter</h1>
                <Input
                    type="text" 
                    placeholder="Имя пользователя" 
                    value={userName} 
                    onChange={setUserNameHandler}
                    onKeyDown={onKeyDownHandler}
                    width='half'
                    size="medium"
                    rounded="low-smooth"
                />
                <Button onClick={signIn} size='small' rounded="low-smooth" width="half">Войти</Button>
                <h3>{signInError}</h3>
            </Container>
        </Container>
    );
}

export default SignIn;