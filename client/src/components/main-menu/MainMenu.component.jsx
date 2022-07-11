import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { socketJoinRoom, socketRecieveMessage, socketSendMessage, useSocketOnEvent } from "../../API/sockets/sockets";
import { UserContext } from "../../context/userContext.context";
import { nanoid } from 'nanoid'

const MainMenu = () => {
    const [message, setMessage] = useState('');
    const {state} = useContext(UserContext);
    const [messages, setMessages] = useState([]);
    const users = useSocketOnEvent('users', []);

    const setMessageHandler = (e) => {
        setMessage(e.target.value);
    }

    /* const joinRoomHandler = () => {
        socketJoinRoom(state.user, room);
    } */

    const sendMessageHandler = () => {
        socketSendMessage({message: message, room: '123'});
        setMessages([...messages, message]);
        setMessage('');
    }

    const keyPressHandler = (e) => {
        if(e.key === "Enter") {
            sendMessageHandler();
        }
    }
    //TODO перезаписывает сообщение может [socket]
    useEffect(() => socketRecieveMessage(setMessages), []);

    return (
        <div>
            <input 
                type="text" 
                placeholder="Сообщение" 
                value={message} 
                onChange={setMessageHandler}
                onKeyDown={keyPressHandler}
            />
            <button onClick={sendMessageHandler}>Отправить сообщение</button>
            <div>
                <h2>{`Имя пользователя: ${state.user}`}</h2>
            </div>
            <div>
                <h2>Сообщения</h2>
                {messages.map((recievedMessage) => <h4 key={nanoid()}>{recievedMessage}</h4>)}
            </div>
            <div>
                <h2>Пользователи:</h2>
                {users.map((user) => user.userName !== state.user ? <h4 key={nanoid()}>{user.userName}</h4> : null)}
            </div>
        </div>
    );
}

export default MainMenu;