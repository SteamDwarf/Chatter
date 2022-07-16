import { ChangeEvent, FC, memo, useContext, useState } from "react";
import { IUserContext, UserContext } from "../../context/userContext.context";
import Container from "../../UI/container/Container";
import Input from "../../UI/input/Input.ui";
import classes from './ContactsHeader.module.css';

interface IContactsHeaderProps {
    userFilter: string;
    setUserFilter: (filter: string) => void;
}

const ContactsHeader:FC<IContactsHeaderProps> = memo(({userFilter, setUserFilter}) => {
    const {user} = useContext<IUserContext>(UserContext);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUserFilter(e.target.value);
    }

    return (
        <Container className={classes.contactsHeader} typeDirection="column">
            <h3 className={classes.contactHeaderName}>{user.userName}</h3>
            <Input
                value={userFilter}
                valueSetter={setUserFilter}
                onChange={onChangeHandler}
                type="text" 
                placeholder="Имя пользователя" 
                size="small" 
                width="full" 
                rounded="medium-smooth"
            />
        </Container>
    );
});

export default memo(ContactsHeader);