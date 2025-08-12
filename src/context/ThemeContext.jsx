import React, { useState } from "react";
import { createContext } from "react";

const ContextTheme = createContext()

const ThemeContext = ({parents}) => {
const [theme,setTheme] = useState("light")

    return (
        <ContextTheme.Provider value={theme,setTheme}>
            {parents}
        </ContextTheme.Provider>
    )
}