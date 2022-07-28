import React, { FC, memo} from 'react'
import { useContext } from 'react'
import { socketGetContactMessages } from '../../API/sockets/sockets';
import { IUserContext, UserContext } from '../../context/user.context'
import { IUser } from '../../ts-features/interfaces';
import RoundedLabel from '../../UI/rounded-label/rounded-label.component';
import './user-item.style.css';

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
            <div className='user-item__data'>
                <RoundedLabel color={contact.color} label={contact.userName}/> 
                <div className='user-item__info'>
                    <h5 className='user-item__name'>{contact.userName}</h5>
                    <p className='user-item__online-status'>
                        <span className={`user-item__online-status-lamp ${contact.isOnline ? 'online' : 'offline'}`}></span>
                        <span>{contact.isOnline ? 'online' : 'offline'}</span>
                    </p>
                </div>
                
            </div>
            {contact.sentNewMessage ? <div className='user-item__notificator'>!</div> : null}
        </div>
    )
});

export default memo(UserItem);