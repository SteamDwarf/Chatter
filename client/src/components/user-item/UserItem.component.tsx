import React, { FC, memo} from 'react'
import { useContext } from 'react'
import { socketGetContactMessages } from '../../API/sockets/sockets';
import { IUserContext, UserContext } from '../../context/userContext.context'
import { IUser } from '../../ts-features/interfaces';
import RoundLabel from '../../UI/round-label/RoundLabel.component';
import './UserItem.css';

interface IUserItemProps {
    contact: IUser;
}

const UserItem:FC<IUserItemProps> = memo(({contact}) => {
    const {user, selectedUser, setSelectedUser, updateUserNewMessageState} = useContext<IUserContext>(UserContext);
    const classNames = `user-item ${selectedUser.userName === contact.userName ? 'selected' : ''}`;

    const onClickHandler = () => {
        updateUserNewMessageState(contact.userName, false);
        setSelectedUser({...contact, sentNewMessage: false});
        socketGetContactMessages(user.userName, contact.userName);
    }


    return (
        <div className={classNames} onClick={onClickHandler}>
            <div className='user-item_data'>
                <RoundLabel color={contact.color} label={contact.userName}/> 
                <div className='user-item_info'>
                    <h5 className='user-item_name'>{contact.userName}</h5>
                    <p className='user-item_online-status'>
                        <span className={`online-status_lamp ${contact.isOnline ? 'online' : 'offline'}`}></span>
                        <span>{contact.isOnline ? 'online' : 'offline'}</span>
                    </p>
                </div>
                
            </div>
            {contact.sentNewMessage ? <div className='user-item_notificator'>!</div> : null}
        </div>
    )
});

export default memo(UserItem);