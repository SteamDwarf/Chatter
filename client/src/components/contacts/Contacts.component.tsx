import React, { memo, useContext, useEffect, useState } from 'react'
import { IUser, IUserContext, UserContext } from '../../context/userContext.context';
import Container from '../../UI/container/Container';
import ContactsHeader from '../contacts-header/ContactsHeader.component';
import UserItem from '../user-item/UserItem.component';
import classes from './Contacts.module.css';

const Contacts = memo(() => {
    const {user, contacts} = useContext<IUserContext>(UserContext);
    const [filter, setFilter] = useState('');
    const [filteredContacts, setFilteredContacts] = useState(contacts);
    
    const filteringUsers = () => {
        const filterLC = filter.toLowerCase();
        setFilteredContacts(contacts.filter(contact => contact.userName.toLowerCase().includes(filterLC)));
    }

    useEffect(filteringUsers, [filter, contacts]);

    return (
        <Container className={classes.contactsBlock} typeDirection='column'>
            <ContactsHeader userFilter={filter} setUserFilter={setFilter}/>
            {filteredContacts.map(contact => contact.userName !== user 
                ? <UserItem key={contact.id} contact={contact}/>
                : null
            )}
        </Container>
    )
});

export default Contacts;