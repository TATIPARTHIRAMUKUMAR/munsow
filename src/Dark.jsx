import React, { createContext, useContext, useState, useEffect } from "react";

const DarkModeContext = createContext();

export const useDarkMode = () => {
  return useContext(DarkModeContext);
};

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const colorTheme = {
    light: {
      background: " #242D36 ",
      foreground: "#000000",
      selectBackground: "#2BE2D0",
      selectBorder: "#212e3e",
      selectIcon: "#21263e",
      textColor: "#eceef0",
    },
    dark: {
      background: "#242D36",
      foreground: "#FFFFFF",
      selectBackground: "#0fe1d2",
      selectBorder: "#212e3e",
      selectIcon: "#21263e",
      textColor: "#ABB2BA",
    },
  };
  const [color, setColor] = useState(
    isDarkMode ? colorTheme.dark : colorTheme.light
  );

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedDarkMode);
    setColor(savedDarkMode ? colorTheme.dark : colorTheme.light);

    // if (savedDarkMode) {
    //   document.documentElement.classList.add("dark");
    //   setColor("  #0fe1d2 ");
    // } else {
    //   document.documentElement.classList.remove("dark");
    //   setColor(" #212e3e ");
    // }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
    setColor(newDarkMode ? colorTheme.dark : colorTheme.light);

    // if (newDarkMode) {
    //   document.documentElement.classList.add("dark");
    //   setColor("  #0fe1d2  ");
    // } else {
    //   document.documentElement.classList.remove("dark");
    //   setColor(" #212e3e");
    // }
  };

  return (
    <DarkModeContext.Provider
      value={{ isDarkMode, toggleDarkMode, color, colorTheme }}
    >
      {children}
    </DarkModeContext.Provider>
  );
};
