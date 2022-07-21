import { memo, useContext } from "react";
import { IUserContext, UserContext } from "../../context/userContext.context";
import { IMessage } from "../../ts-features/interfaces";
import RoundLabel from "../../UI/round-label/RoundLabel.component";
import './Message.css';

const Message = memo(({message}: {message: IMessage}) => {
    const {user, selectedUser} = useContext<IUserContext>(UserContext)
    const classNames = `message-block ${message.from === user.userName ? 'self' : 'other'}`
    const color = message.from === user.userName ? user.color : selectedUser.color;

    return (
        <div className={classNames}>
            <div className='message'>
                <p className='message_text'>{message.content}</p>
                <div className='message_date'>
                    <div className='message_date_item'>{message.date.split(' ')[0]}</div>
                    <div className='message_date_item'>{message.date.split(' ')[1]}</div>
                </div>
            </div>
            <RoundLabel color={color} label={message.from}/>
        </div>
        
    );
});

export default Message;