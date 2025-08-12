import React, { useEffect, useState } from "react";
import { createContext } from "react";

export const ContextTheme = createContext();

const ThemeContext = ({ parents }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") === "dark" ? true : false;
  });

  
  return (
    <ContextTheme.Provider value={(theme, setTheme)}>
      {parents}
    </ContextTheme.Provider>
  );
};

export default ThemeContext;