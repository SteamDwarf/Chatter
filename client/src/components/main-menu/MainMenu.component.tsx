import { Fragment, memo, useContext } from "react";
import Contacts from '../contacts/Contacts.component';
import Container from "../../UI/container/Container";
import Chat from "../chat/Chat.component";
import useWindowDimension from "../../utils/hooks/useWindowDimensions";
import { IUserContext, UserContext } from "../../context/userContext.context";


const MainMenu = () => {
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
};

export default memo(MainMenu);