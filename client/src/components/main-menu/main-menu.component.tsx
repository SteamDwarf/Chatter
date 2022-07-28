import { memo, useContext } from "react";
import Contacts from '../contacts/contacts.component';
import Container from "../../UI/container/container.ui";
import Chat from "../chat/chat.component";
import useWindowDimension from "../../utils/hooks/useWindowDimensions";
import { IUserContext, UserContext } from "../../context/user.context";


const MainMenu = memo(() => {
    const {width} = useWindowDimension();
    const {selectedUser} = useContext<IUserContext>(UserContext);

    if(width > 750) {
        return (
            <Container height="fullHeight">
                <Contacts />
                <Chat />
            </Container>
        );
    }

    if(selectedUser.userName) {
        return (
            <Container height="fullHeight">
                <Chat />
            </Container>
        );
    } 

    return (
        <Container height="fullHeight">
            <Contacts />
        </Container>
    );
});

export default MainMenu;