import React, { FC, useEffect, useState } from 'react'
import { useContext } from 'react'
import { IUser, IUserContext, UserContext } from '../../context/userContext.context'
import Container from '../../UI/container/Container';
import classes from './UserItem.module.css';

interface IUserItemProps {
    contact: IUser;
}

const UserItem:FC<IUserItemProps> = ({contact}) => {
    const {setSelectedUser, updateUserNewMessageState} = useContext<IUserContext>(UserContext);

    const onClickHandler = () => {
        updateUserNewMessageState(contact.userName, false);
        setSelectedUser({id: contact.id, userName: contact.userName, messages: contact.messages, hasNewMessage: false});
    }

    return (
        <div className={`${classes.userItem} ${contact.hasNewMessage ? classes.newMessage : ''}`} onClick={onClickHandler}>
            <h3 className={classes.userIcon}>{contact.userName[0]}</h3>
            <h4>{contact.userName}</h4>
        </div>
    )
}

export default UserItem