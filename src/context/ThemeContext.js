import { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = (props) => {

    const [theme, setTheme] = useState({
        menu: true,
        postMode: false
    })

    return (
        <ThemeContext.Provider value={ {theme, setTheme} }>
            {props.children}
        </ThemeContext.Provider>
    );
}