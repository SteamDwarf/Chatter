import React, { memo, useContext, useEffect, useMemo, useState } from 'react'
import { IUserContext, UserContext } from '../../context/user.context';
import Container from '../../UI/container/container.ui';
import ContactsHeader from './__header/contacts__header.component';
import UserItem from '../user-item/user-item.component';
import './contacts.style.css';

const Contacts = memo(() => {
    const {user, contacts} = useContext<IUserContext>(UserContext);
    const [filter, setFilter] = useState('');
    const [filteredContacts, setFilteredContacts] = useState(contacts);
    
    const memorizedContacts = useMemo(() => {
        const filterLC = filter.toLowerCase();
        return contacts.filter(contact => contact.userName.toLowerCase().includes(filterLC));
    }, [contacts, filter])

    const filteringUsers = () => {
        setFilteredContacts(memorizedContacts);
    }

    useEffect(filteringUsers, [filter, contacts]);

    return (
        <Container className='contacts' typeDirection='column'>
            <ContactsHeader userFilter={filter} setUserFilter={setFilter}/>
            <Container className='contacts__list' typeDirection='column'>
                {filteredContacts.map(contact => contact.userName !== user.userName 
                    ? <UserItem key={contact.id} contact={contact}/>
                    : null
                )}
            </Container>
        </Container>
    )
});

export default Contacts;