import { useContext } from "react";
import { IUserContext, UserContext } from "../../context/userContext.context";
import { IMessage } from "../../ts-features/interfaces";
import classes from './Message.module.css';

const Message = ({message}: {message: IMessage}) => {
    const {user} = useContext<IUserContext>(UserContext)
    const classNames = `${classes.message} ${message.from === user ? classes.self : classes.other}`

    return (
        <div className={classNames}>
            <h4 className={classes.messageTitle}>{`${message.from}:`}</h4>
            <p className={classes.messageText}>{message.content}</p>
            <div className={classes.messageDate}>
                <div className={classes.messageDateInfo}>{message.date.split(' ')[0]}</div>
                <div className={classes.messageTimeInfo}>{message.date.split(' ')[1]}</div>
            </div>
        </div>
    );
}

export default Message;