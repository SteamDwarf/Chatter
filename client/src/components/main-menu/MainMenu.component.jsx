import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { socketJoinRoom, socketRecieveMessage, socketSendMessage, socketSendPrivateMessage, useSocketOnEvent } from "../../API/sockets/sockets";
import { UserContext } from "../../context/userContext.context";
import { nanoid } from 'nanoid'
import UserItem from "../user-item/UserItem.component";

const MainMenu = () => {
    const [message, setMessage] = useState('');
    const {state} = useContext(UserContext);
    const [messages, setMessages] = useState([]);
    const users = useSocketOnEvent('users', []);
    const messageData = useSocketOnEvent('private_message', {message: '', from: ''});

    const setMessageHandler = (e) => {
        setMessage(e.target.value);
    }

    /* const joinRoomHandler = () => {
        socketJoinRoom(state.user, room);
    } */

    const sendMessageHandler = () => {
        socketSendPrivateMessage({message: message, to: state.selectedUser.id});
        //socketSendMessage({message: message, room: '123'});
        setMessages([...messages, {message, from: 'self'}]);
        setMessage('');
    }

    const keyPressHandler = (e) => {
        if(e.key === "Enter") {
            sendMessageHandler();
        }
    }
    //TODO перезаписывает сообщение может [socket]
    useEffect(() => {
        if(messageData.message) {
            setMessages([...messages, messageData])
        }
    }, [messageData]);

    return (
        <div>
            <div>
                <h2>{`Имя пользователя: ${state.user}`}</h2>
            </div>
            <div>
                <h2>Сообщения:</h2>
                {messages.map((recievedMessage) => <h4 key={nanoid()}>{`${recievedMessage.from}: ${recievedMessage.message}`}</h4>)}
            </div>
            <div>
                <h2>Пользователи:</h2>
                {users.map((user) => user.userName !== state.user ? <UserItem key={user.id} id={user.id} userName={user.userName}/> : null)}
            </div>
            {
                state.selectedUser.id
                ? (<div>
                        <input 
                            type="text" 
                            placeholder="Сообщение" 
                            value={message} 
                            onChange={setMessageHandler}
                            onKeyDown={keyPressHandler}
                        />
                        <button onClick={sendMessageHandler}>Отправить сообщение</button>
                    </div>)
                : null
            }
            
        </div>
    );
}

export default MainMenu;