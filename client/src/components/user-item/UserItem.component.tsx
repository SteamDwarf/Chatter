import React, { FC } from 'react'
import { useContext } from 'react'
import { IUser, IUserContext, UserContext } from '../../context/userContext.context'
import './UserItem.style.css';

const UserItem: FC<IUser> = ({userName, id}) => {
    const {setSelectedUser} = useContext<IUserContext>(UserContext);

    const onClickHandler = () => {
        setSelectedUser({id, userName});
    }

    return (
    <div className='user-item' onClick={onClickHandler}>
        <h4>{userName}</h4>
    </div>
    )
}

export default UserItem