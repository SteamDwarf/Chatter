import {Container} from '@mui/material';

import { ChangeEvent, KeyboardEvent, useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { SocketEvents, socketSendPrivateMessage, useSocketOnEvent } from "../../API/sockets/sockets";
import { IUser, IUserContext, UserContext } from "../../context/userContext.context";
import { nanoid } from 'nanoid'
import UserItem from "../user-item/UserItem.component";
import { MessageFrom } from "../../ts-features/interfaces";

const MainMenu = () => {
    const [messageContent, setMessageContent] = useState('');
    const {user, selectedUser} = useContext<IUserContext>(UserContext);
    const [messages, setMessages] = useState<MessageFrom[]>([]);
    const onlineUsers = useSocketOnEvent<IUser[]>(SocketEvents.USERS, []);
    const messageData = useSocketOnEvent<MessageFrom>(SocketEvents.PRIVATE_MESSAGE, {content: '', from: ''});

    const setMessageHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setMessageContent(e.target.value);
    }

    const sendMessageHandler = () => {
        socketSendPrivateMessage({content: messageContent, to: selectedUser.id});
        setMessages([...messages, {content: messageContent, from: 'self'}]);
        setMessageContent('');
    }

    const keyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") {
            sendMessageHandler();
        }
    }
    //TODO перезаписывает сообщение может [socket]
    useEffect(() => {
        if(messageData.content) {
            setMessages([...messages, messageData])
        }
    }, [messageData]);

    return (
        <Container>
            <div>
                <h2>{`Имя пользователя: ${user}`}</h2>
            </div>
            <div>
                <h2>Сообщения:</h2>
                {messages.map((recievedMessage) => <h4 key={nanoid()}>{`${recievedMessage.from}: ${recievedMessage.content}`}</h4>)}
            </div>
            <div>
                <h2>Пользователи:</h2>
                {onlineUsers.map((onlineUser) => onlineUser.userName !== user ? <UserItem key={onlineUser.id} id={onlineUser.id} userName={onlineUser.userName}/> : null)}
            </div>
            {
                selectedUser.id
                ? (<div>
                        <input 
                            type="text" 
                            placeholder="Сообщение" 
                            value={messageContent} 
                            onChange={setMessageHandler}
                            onKeyDown={keyPressHandler}
                        />
                        <button onClick={sendMessageHandler}>Отправить сообщение</button>
                    </div>)
                : null
            }
        </Container>
    );
}

export default MainMenu;