import { DarkMode, LightMode } from "@mui/icons-material";
import { ChangeEvent, FC, memo, useContext } from "react";
import { IThemeContext, ThemeContext } from "../../../context/theme.context";
import { IUserContext, UserContext } from "../../../context/user.context";
import { THEMES } from "../../../ts-features/enums";
import Container from "../../../UI/container/container.ui";
import Input from "../../../UI/input/Input.ui";
import './contacts__header.style.css';

interface IContactsHeaderProps {
    userFilter: string;
    setUserFilter: (filter: string) => void;
}

const ContactsHeader:FC<IContactsHeaderProps> = memo(({userFilter, setUserFilter}) => {
    const {user} = useContext<IUserContext>(UserContext);
    const {theme, setTheme} = useContext<IThemeContext>(ThemeContext);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUserFilter(e.target.value);
    }

    const themeBtnHandler = () => {
        const newTheme = theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;

        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    }

    return (
        <Container className='contact__header' typeDirection="column">
            <div className='contact__header-user-data'>
                <h4 className='contact__header-username'>{user.userName}</h4>
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

export default ContactsHeader;