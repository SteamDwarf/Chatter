import { useContext } from "react";
import { useEffect } from "react";
import { SocketEvents, useSocketOnEvent } from "../../API/sockets/sockets";
import { IUser, IUserContext, UserContext } from "../../context/userContext.context";
import Contacts from '../contacts/Contacts.component';
import Container from "../../UI/container/Container";
import Chat from "../chat/Chat.component";


const MainMenu = () => {
    const {selectedUser, setContacts} = useContext<IUserContext>(UserContext);

    return (
        <Container height="fullHeight">
            <Contacts />
            <Chat />
        </Container>
    );
}

export default MainMenu;