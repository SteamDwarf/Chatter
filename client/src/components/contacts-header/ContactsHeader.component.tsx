import { useContext } from "react";
import { IUserContext, UserContext } from "../../context/userContext.context";
import Container from "../../UI/container/Container";
import Input from "../../UI/input/Input.ui";

const ContactsHeader = () => {
    const {user} = useContext<IUserContext>(UserContext);

    return (
        <Container typeDirection="column">
            <h2>{user}</h2>
            <Input type="text" placeholder="Имя пользователя" size="small" width="full" rounded="medium-smooth"/>
        </Container>
    );
}

export default ContactsHeader;