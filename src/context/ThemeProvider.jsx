import React, { useState } from "react";
import {ThemeContext} from "../context/ThemeContext";

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") === "dark" ? true : false;
  });

  const value = { theme, setTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;


