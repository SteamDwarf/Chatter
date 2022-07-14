import { ChangeEvent, KeyboardEvent, useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { SocketEvents, socketSendPrivateMessage, useSocketOnEvent } from "../../API/sockets/sockets";
import { IUser, IUserContext, UserContext } from "../../context/userContext.context";
import { nanoid } from 'nanoid'
import UserItem from "../user-item/UserItem.component";
import { MessageFrom } from "../../ts-features/interfaces";
import SidebarLayout from '../../UI/layouts/sidebar-layout/SidebarLayout.ui';
import ContactsHeader from '../contacts-header/ContactsHeader.component';
import Contacts from '../contacts/Contacts.component';
import Container from "../../UI/container/Container";
import Chat from "../chat/Chat.component";


const MainMenu = () => {
    const {selectedUser, setContacts} = useContext<IUserContext>(UserContext);
    const onlineUsers = useSocketOnEvent<IUser[]>(SocketEvents.USERS, []);

    useEffect(() => {
        setContacts(onlineUsers);
    }, [onlineUsers]);

    return (
        <Container height="fullHeight">
            <Contacts contacts={onlineUsers}/>
            <Chat />
        </Container>
    );
}

export default MainMenu;