import React, { useEffect, useState } from "react";
import { ThemeProvider as SCThemeProvider } from "styled-components";
import dark from "theme/dark";
import light from "theme/light";

const CACHE_KEY = "IS_DARK";

const ThemeContext = React.createContext({
  isDark: false,
  toggleTheme: (): void => {},
});

const ThemeContextProvider: React.FC = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const isDarkUserSetting = localStorage.getItem(CACHE_KEY);

    return isDarkUserSetting
      ? JSON.parse(isDarkUserSetting)
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const toggleTheme = (): void => {
    setIsDark((prevState) => {
      localStorage.setItem(CACHE_KEY, JSON.stringify(!prevState));
      return !prevState;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <SCThemeProvider theme={isDark ? dark : light}>
        {children}
      </SCThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeContextProvider };
