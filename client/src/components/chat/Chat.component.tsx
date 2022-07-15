import { ChangeEvent, FC, KeyboardEvent, useContext, useState, useEffect } from "react";
import { IUserContext, UserContext } from "../../context/userContext.context";
import { IMessage} from "../../ts-features/interfaces";
import Container from "../../UI/container/Container";
import Input from "../../UI/input/Input.ui";
import classes from './Chat.module.css';
import MessageLogo from '../../assets/icons/send-svgrepo-com (1).svg';
import Button from "../../UI/button/Button.ui";
import { SocketEvents, socketSendPrivateMessage, useRecievedMessage, useSocketOnEvent } from "../../API/sockets/sockets";
import { nanoid } from "nanoid";
import Message from "../message/Message.component";
import TextArea from "../../UI/text-area/TextArea.component";

interface IChatProps {
}

const Chat:FC<IChatProps> = () => {
    const {user, messages, selectedUser, setMessages} = useContext<IUserContext>(UserContext);
    const [messageContent, setMessageContent] = useState('');

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessageContent(e.target.value);
    }

    const messagesShowing = (message: IMessage) => {
        if(message.from === selectedUser.userName || (message.from === user && message.to === selectedUser.id)) {
            return <Message key={nanoid()} message={message}/>
        }

        return null;
    }

    const sendMessageHandler = () => {
        const mes: IMessage = {
            id: nanoid(), 
            content: messageContent, 
            to: selectedUser.id, 
            from: user,  
            date: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
        }


        socketSendPrivateMessage(mes);
        setMessages([...messages, mes]);
        setMessageContent('');
    }
    const keyPressHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if(e.key === "Enter") {
            sendMessageHandler();
        }
    }

    if(selectedUser.userName) {
        return (
            <Container className={classes.chat} typeDirection="column" contentPosition="left-bottom" height="fullHeight">
                <div className={classes.messagesContainer}>
                    {messages.map(recievedMessage => messagesShowing(recievedMessage))}
                </div>
                <div className={classes.chatInput}>
                    <div onClick={sendMessageHandler} className={classes.sendBtn}>
                        <img src={MessageLogo} alt="" />
                    </div>
                    <TextArea 
                        className={classes.messageTextArea}
                        value={messageContent} 
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