import React, {ChangeEvent, FormEvent, KeyboardEvent, useEffect, useState} from "react";
import { useContext } from "react";
import { connectToServer, useSocketOnError } from "../../API/sockets/sockets";
import { IUserContext, UserContext } from "../../context/user.context";
import Container from "../../UI/container/container.ui";
import Button from "../../UI/button/button.ui";
import Input from "../../UI/input/Input.ui";
import FormMessage from "./__message/sign-in-form__message.component";
import './sign-in-form.style.css';

const colors = ['red', 'green', 'purple', 'blue'];

const SignInForm = () => {
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

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        signIn();
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") {
            signIn();
        }
    }

    useEffect(() => {
        setIsLogsIn(false);
    }, [signInError]);

    return (
        <Container contentPosition="center-center" height="fullHeight">
            <form className="sign-in-form" onSubmit={onSubmit}>
                <h2 className="sign-in-form__title">Добро пожаловать в Chatter</h2>
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
                <Button disabled={isLogsIn ? true : false} type='submit' size='medium' rounded="low-smooth" width="full">Войти</Button>
                <div className="sign-in-form_message">
                    <FormMessage isLoading={isLogsIn} error={signInError}/>
                </div>
            </form>
        </Container>
    );
}

export default SignInForm;