import { ChangeEvent, FC, KeyboardEvent, useContext, useState, useEffect, useRef } from "react";
import { IUserContext, UserContext } from "../../context/user.context";
import { defaultUser } from "../../ts-features/interfaces";
import { IMessage} from "../../ts-features/interfaces";
import Container from "../../UI/container/container.ui";
import {socketSendPrivateMessage} from "../../API/sockets/sockets";
import { nanoid } from "nanoid";
import Message from "./__message/message.component";
import { TextareaAutosize } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import AttachFile from "@mui/icons-material/AttachFile";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './chat.style.css';

interface IChatProps {
}

const Chat:FC<IChatProps> = () => {
    const {user, selectedUser, setSelectedUser, addMessage, contactMessages, clearMessages} = useContext<IUserContext>(UserContext);
    const [messageContent, setMessageContent] = useState('');
    const [attachedFiles, setAttachedFiles] = useState<File []>([]);
    const chatEndpoint = useRef<HTMLDivElement>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessageContent(e.target.value);
    }

    const backBtnHandler = () => {
        setSelectedUser(defaultUser);
        clearMessages();
    }

    const sendMessageHandler = () => {
        if(!messageContent) return;

        const mes: IMessage = {
            id: nanoid(), 
            content: messageContent, 
            to: selectedUser.userName, 
            from: user.userName,  
            date: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
            files: attachedFiles
        }

        socketSendPrivateMessage(mes);
        addMessage(mes);
        setMessageContent('');
    }

    const attachFiles = (e: ChangeEvent<HTMLInputElement>) => {
        setAttachedFiles(Array.prototype.slice.call(e.target.files));
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
                <div className='chat__header'>
                    <div className='chat__back-btn' onClick={backBtnHandler}>
                        <ArrowBackIcon fontSize="large"/>
                    </div>
                    <h5 className='chat__header-selected-user'>{selectedUser.userName}</h5>
                    <div className='chat__header-selected-user-after'></div>
                </div>
                <div className='chat__messages-container'>
                    {contactMessages.map(message => <Message key={message.id} message={message}/>)}
                    <div ref={chatEndpoint}></div>
                </div>
                <div className='chat__input-block'>
                    <div className="chat__buttons">
                        <button onClick={sendMessageHandler} className='chat__btn'>
                            <SendIcon className="chat__send-btn-svg"/>
                        </button>
                    </div>
                    
                    <TextareaAutosize 
                        value={messageContent} 
                        onChange={onChangeHandler}
                        className='chat__message-textarea'
                        onKeyDown={keyPressHandler}
                    />
                </div>
            </Container>
        );
    }

    return null
}

export default Chat;