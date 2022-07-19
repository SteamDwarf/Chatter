import { DarkMode, LightMode } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { ChangeEvent, FC, memo, useContext, useState } from "react";
import { IUserContext, UserContext } from "../../context/userContext.context";
import { THEMES } from "../../ts-features/enums";
import Container from "../../UI/container/Container";
import Input from "../../UI/input/Input.ui";
import './ContactsHeader.css';

interface IContactsHeaderProps {
    userFilter: string;
    setUserFilter: (filter: string) => void;
}

const ContactsHeader:FC<IContactsHeaderProps> = memo(({userFilter, setUserFilter}) => {
    const {user, theme, setTheme} = useContext<IUserContext>(UserContext);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUserFilter(e.target.value);
    }

    const themeBtnHandler = () => {
        setTheme(theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT);
    }

    return (
        <Container className='contact_header' typeDirection="column">
            <div className='contact_header_user-data'>
                <h4 className='contact_header_user-name'>{user.userName}</h4>
                {
                    theme === THEMES.LIGHT
                    ? <LightMode color="warning" fontSize="large" className='theme-btn' onClick={themeBtnHandler}/>
                    : <DarkMode color="primary" fontSize="large" className='theme-btn' onClick={themeBtnHandler}/>
                }
            </div>
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