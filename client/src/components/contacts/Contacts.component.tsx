import React, { memo, useContext, useEffect, useMemo, useState } from 'react'
import { IUserContext, UserContext } from '../../context/userContext.context';
import Container from '../../UI/container/Container';
import ContactsHeader from '../contacts-header/ContactsHeader.component';
import UserItem from '../user-item/UserItem.component';
import './Contacts.css';

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
        <Container className='contacts-block' typeDirection='column'>
            <ContactsHeader userFilter={filter} setUserFilter={setFilter}/>
            <Container className='contacts-list' typeDirection='column'>
                {filteredContacts.map(contact => contact.userName !== user.userName 
                    ? <UserItem key={contact.id} contact={contact}/>
                    : null
                )}
            </Container>
        </Container>
    )
});

export default Contacts;