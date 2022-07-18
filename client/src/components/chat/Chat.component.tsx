import { ChangeEvent, FC, KeyboardEvent, useContext, useState, useEffect, useRef } from "react";
import { defaultUser, IUserContext, UserContext } from "../../context/userContext.context";
import { IMessage} from "../../ts-features/interfaces";
import Container from "../../UI/container/Container";
import classes from './Chat.module.css';
import MessageLogo from '../../assets/icons/send-svgrepo-com (1).svg';
import BackSvg from '../../assets/icons/previous-arrows-svgrepo-com.svg';
import {socketSendPrivateMessage} from "../../API/sockets/sockets";
import { nanoid } from "nanoid";
import Message from "../message/Message.component";
import TextArea from "../../UI/text-area/TextArea.component";
import { TextareaAutosize } from "@mui/material";

interface IChatProps {
}

const Chat:FC<IChatProps> = () => {
    const {user, selectedUser, setSelectedUser, addMessage} = useContext<IUserContext>(UserContext);
    const [messageContent, setMessageContent] = useState('');
    const chatEndpoint = useRef<HTMLDivElement>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessageContent(e.target.value);
    }

    const backBtnHandler = () => {
        setSelectedUser(defaultUser);
    }

    const messagesShowing = (message: IMessage) => {
        if(message.from === selectedUser.userName || (message.from === user.userName && message.to === selectedUser.userName)) {
            return <Message key={nanoid()} message={message}/>
        }

        return null;
    }

    const sendMessageHandler = () => {
        const mes: IMessage = {
            id: nanoid(), 
            content: messageContent, 
            to: selectedUser.userName, 
            from: user.userName,  
            date: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
        }


        socketSendPrivateMessage(mes);
        addMessage(mes);
        setMessageContent('');
    }

    const scrollToBottom = () => {
        chatEndpoint.current?.scrollIntoView(/* { behavior: "smooth" } */)
    }

    const keyPressHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {        
        if(e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessageHandler();
            return;
        }

    }

    useEffect(() => {
        scrollToBottom();
    }, [selectedUser]);

    /* useEffect(() => {
        //scrollToBottom();
        if(messages[messages.length - 1].from === selectedUser.userName) {
            scrollToBottom();
        }
    }, [messages, selectedUser]); */
    console.log(user.messages);

    if(selectedUser.userName) {
        return (
            <Container className={classes.chat} typeDirection="column" contentPosition="left-bottom" height="fullHeight">
                <div className={classes.chatHeader}>
                    <img className={classes.backBtn} src={BackSvg} alt="Назад" onClick={backBtnHandler}/>
                    <h3>{selectedUser.userName}</h3>
                </div>
                <div className={classes.messagesContainer}>
                    {/* {user.messages.map(recievedMessage => messagesShowing(recievedMessage))} */}
                    {user.messages.find(messageObj => messageObj.userName === selectedUser.userName)?.messages.map(recievedMessage => messagesShowing(recievedMessage))}
                    <div ref={chatEndpoint}></div>
                </div>
                <div className={classes.chatInput}>
                    <div onClick={sendMessageHandler} className={classes.sendBtn}>
                        <img src={MessageLogo} alt="Отправить сообщение" />
                    </div>
                    <TextareaAutosize 
                        value={messageContent} 
                        onChange={onChangeHandler}
                        className={classes.messageTextArea}
                        onKeyDown={keyPressHandler}
                    />
                </div>
            </Container>
        );
    }

    return null
}

export default Chat;