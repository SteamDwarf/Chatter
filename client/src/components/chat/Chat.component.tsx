import { ChangeEvent, FC, KeyboardEvent, useContext, useState, useEffect } from "react";
import { IUserContext, UserContext } from "../../context/userContext.context";
import { Message, MessageFrom } from "../../ts-features/interfaces";
import Container from "../../UI/container/Container";
import Input from "../../UI/input/Input.ui";
import classes from './Chat.module.css';
import MessageLogo from '../../assets/icons/send-svgrepo-com (1).svg';
import Button from "../../UI/button/Button.ui";
import { SocketEvents, socketSendPrivateMessage, useSocketOnEvent } from "../../API/sockets/sockets";
import { nanoid } from "nanoid";

interface IChatProps {
}

const Chat:FC<IChatProps> = () => {
    const {user, selectedUser} = useContext<IUserContext>(UserContext);
    const [messageContent, setMessageContent] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const messageData = useSocketOnEvent<Message>(SocketEvents.PRIVATE_MESSAGE, {content: '', from: '', to: '', date: ''});

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setMessageContent(e.target.value);
    }

    const sendMessageHandler = () => {
        socketSendPrivateMessage({content: messageContent, to: selectedUser.id, from: user,  date: Date.now()});
        setMessages([...messages, {content: messageContent, from: 'Я', to: selectedUser.id, date: Date.now()}]);
        setMessageContent('');
    }
    const keyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") {
            sendMessageHandler();
        }
    }

    useEffect(() => {
        if(messageData.content) {
            setMessages([...messages, messageData])
        }
    }, [messageData]);

    if(selectedUser.userName) {
        return (
            <Container typeDirection="column" contentRarity="space-between" height="fullHeight">
                <div className={classes.messagesContainer}>
                    {messages.map(recievedMessage => {
                        if(recievedMessage.from === selectedUser.userName 
                            || (recievedMessage.from === 'Я' && recievedMessage.to === selectedUser.id)) {
                            return <h4 key={nanoid()}>{`${recievedMessage.from}: ${recievedMessage.content}`}</h4>
                        }

                        return null;
                    })}
                </div>
                <div className={classes.chatInput}>
                    <div onClick={sendMessageHandler} className={classes.sendBtn}>
                        <img src={MessageLogo} alt="" />
                    </div>
                    <Input 
                        value={messageContent} 
                        valueSetter={setMessageContent}
                        onChange={onChangeHandler}
                        onKeyDown={keyPressHandler}
                        size='medium'
                        rounded="medium-smooth"
                        width="full"
                    />
                </div>
            </Container>
        );
    }

    return null
}

export default Chat;