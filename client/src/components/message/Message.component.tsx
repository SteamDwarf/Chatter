import { useContext } from "react";
import { IUserContext, UserContext } from "../../context/userContext.context";
import { IMessage } from "../../ts-features/interfaces";
import RoundLabel from "../../UI/round-label/RoundLabel.component";
import classes from './Message.module.css';

const Message = ({message}: {message: IMessage}) => {
    const {user, selectedUser} = useContext<IUserContext>(UserContext)
    const classNames = `${classes.messageBlock} ${message.from === user.userName ? classes.self : classes.other}`
    const color = message.from === user.userName ? user.color : selectedUser.color;

    return (
        <div className={classNames}>
            <div className={classes.message}>
                <p className={classes.messageText}>{message.content}</p>
                <div className={classes.messageDate}>
                    <div className={classes.messageDateInfo}>{message.date.split(' ')[0]}</div>
                    <div className={classes.messageTimeInfo}>{message.date.split(' ')[1]}</div>
                </div>
            </div>
            <RoundLabel color={color} label={message.from}/>
        </div>
        
    );
}

export default Message;