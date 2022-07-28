import { memo, useContext } from "react";
import { IUserContext, UserContext } from "../../../context/user.context";
import { IMessage } from "../../../ts-features/interfaces";
import RoundedLabel from "../../../UI/rounded-label/rounded-label.component";
import './message.style.css';

const Message = memo(({message}: {message: IMessage}) => {
    const {user, selectedUser} = useContext<IUserContext>(UserContext)
    const classNames = `chat__message ${message.from === user.userName ? 'chat__message-self' : 'chat__message-other'}`
    const color = message.from === user.userName ? user.color : selectedUser.color;

    return (
        <div className={classNames}>
            <div className='chat__message-content'>
                <p className='chat__message-text'>{message.content}</p>
                <div className='chat__message-date'>
                    <div className='chat__message-date-item'>{message.date.split(' ')[0]}</div>
                    <div className='chat__message-date-item'>{message.date.split(' ')[1]}</div>
                </div>
            </div>
            <RoundedLabel color={color} label={message.from}/>
        </div>
        
    );
});

export default Message;