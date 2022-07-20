import { ChangeEvent, FC, KeyboardEvent, useContext, useState, useEffect, useRef } from "react";
import { IUserContext, UserContext } from "../../context/userContext.context";
import { defaultUser } from "../../ts-features/interfaces";
import { IMessage} from "../../ts-features/interfaces";
import Container from "../../UI/container/Container";
import {socketSendPrivateMessage} from "../../API/sockets/sockets";
import { nanoid } from "nanoid";
import Message from "../message/Message.component";
import { TextareaAutosize } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './Chat.css';

interface IChatProps {
}

const Chat:FC<IChatProps> = () => {
    const {user, selectedUser, setSelectedUser, addMessage, contactMessages} = useContext<IUserContext>(UserContext);
    const [messageContent, setMessageContent] = useState('');
    const chatEndpoint = useRef<HTMLDivElement>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessageContent(e.target.value);
    }

    const backBtnHandler = () => {
        setSelectedUser(defaultUser);
    }

    const sendMessageHandler = () => {
        if(!messageContent) return;

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
        chatEndpoint.current?.scrollIntoView();
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
    }, [contactMessages]);

    if(selectedUser.userName) {
        return (
            <Container className='chat' typeDirection="column" contentPosition="left-bottom" height="fullHeight">
                <div className='chat_header'>
                    <div className='chat_back-btn' onClick={backBtnHandler}>
                        <ArrowBackIcon fontSize="large"/>
                    </div>
                    <h5 className='chat_header_selected-user'>{selectedUser.userName}</h5>
                    <div className='chat_header_selected-user_after'></div>
                </div>
                <div className='chat_messages-container'>
                    {contactMessages.map(message => <Message key={message.id} message={message}/>)}
                    <div ref={chatEndpoint}></div>
                </div>
                <div className='chat_input'>
                    <div onClick={sendMessageHandler} className='chat_send-btn'>
                        <SendIcon className="chat_send-btn_svg"/>
                    </div>
                    <TextareaAutosize 
                        value={messageContent} 
                        onChange={onChangeHandler}
                        className='chat_message-text-area'
                        onKeyDown={keyPressHandler}
                    />
                </div>
            </Container>
        );
    }

    return null
}

export default Chat;