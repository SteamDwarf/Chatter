import { memo } from "react";
import Contacts from '../contacts/Contacts.component';
import Container from "../../UI/container/Container";
import Chat from "../chat/Chat.component";


const MainMenu = () => {

    return (
        <Container height="fullHeight">
            <Contacts />
            <Chat />
        </Container>
    );
};

export default memo(MainMenu);