import React from 'react'
import { useContext } from 'react'
import { selectUserAction, UserContext } from '../../context/userContext.context'
import './UserItem.style.css';

const UserItem = ({userName, id}) => {
    const {dispatch} = useContext(UserContext);

    const onClickHandler = (e) => {
        dispatch(selectUserAction({id, userName}));
    }

    return (
    <div className='user-item' onClick={onClickHandler}>
        <h4>{userName}</h4>
    </div>
    )
}

export default UserItem