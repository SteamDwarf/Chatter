import React, { FC, memo} from 'react'
import { useContext } from 'react'
import { IUser, IUserContext, UserContext } from '../../context/userContext.context'
import RoundLabel from '../../UI/round-label/RoundLabel.component';
import classes from './UserItem.module.css';

interface IUserItemProps {
    contact: IUser;
}

const UserItem:FC<IUserItemProps> = ({contact}) => {
    const {selectedUser, setSelectedUser, updateUserNewMessageState} = useContext<IUserContext>(UserContext);
    const classNames = `${classes.userItem} ${selectedUser.userName === contact.userName ? classes.selected : ''}`;

    const onClickHandler = () => {
        updateUserNewMessageState(contact.userName, false);
        setSelectedUser({...contact, sentNewMessage: false});
    }

    return (
        <div className={classNames} onClick={onClickHandler}>
            <div className={classes.userData}>
                <RoundLabel color={contact.color} label={contact.userName}/>   
                <h4 className={classes.userName}>{contact.userName}</h4>
            </div>
            {contact.sentNewMessage ? <div className={classes.userNotificator}>!</div> : null}
        </div>
    )
}

export default memo(UserItem);