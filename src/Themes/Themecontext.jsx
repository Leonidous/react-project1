import React from 'react'
import {createContext, useState} from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState('fire');

    const selectTheme = (selectedTheme) => {
        setTheme(selectedTheme)
    }

    return (
        <ThemeContext.Provider value={{theme, selectTheme}}>
            {children}
        </ThemeContext.Provider>
    )
};