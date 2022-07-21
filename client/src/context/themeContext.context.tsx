import { createContext, useEffect, useState } from "react";
import { THEMES } from "../ts-features/enums";

export interface IThemeContext {
    theme: THEMES;
    setTheme: (theme: THEMES) => void;
}

const defaultState: IThemeContext = {
    theme: THEMES.LIGHT,
    setTheme: (theme) => null
}

export const ThemeContext = createContext<IThemeContext>(defaultState);

export const ThemeProvider = ({children}:{children: React.ReactNode}) => {
    const [theme, setTheme] = useState<THEMES>(THEMES.LIGHT);

    const value: IThemeContext = {
        theme,
        setTheme
    }

    useEffect(() => {
        const curTheme = localStorage.getItem('theme');

        if(curTheme) setTheme(curTheme as THEMES);
    }, []);
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}