import React, { useContext } from 'react'
import { IUser, IUserContext, UserContext } from '../../context/userContext.context';
import Container from '../../UI/container/Container';
import Sidebar from '../../UI/sidebar/Sidebar.ui';
import ContactsHeader from '../contacts-header/ContactsHeader.component';
import UserItem from '../user-item/UserItem.component';

const Contacts = ({users}: {users: IUser[]}) => {
    const {user} = useContext<IUserContext>(UserContext);

    return (
        <Container width='30' typeDirection='column'>
            <ContactsHeader />
            {users.map(contact => contact.userName !== user 
                ? <UserItem key={contact.id} id={contact.id} userName={contact.userName}/>
                : null
            )}
        </Container>
    )
}

export default Contacts;