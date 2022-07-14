import React, { FC } from 'react'
import { useContext } from 'react'
import { IUser, IUserContext, UserContext } from '../../context/userContext.context'
import Container from '../../UI/container/Container';
import classes from './UserItem.module.css';

const UserItem: FC<IUser> = ({userName, id}) => {
    const {setSelectedUser} = useContext<IUserContext>(UserContext);

    const onClickHandler = () => {
        setSelectedUser({id, userName});
    }

    return (
    <div className={classes.userItem} onClick={onClickHandler}>
        <h3 className={classes.userIcon}>{userName[0]}</h3>
        <h4>{userName}</h4>
    </div>
    )
}

export default UserItem