import React, { useState } from "react";

interface Props {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}
export const ThemeContext = React.createContext<Props>({
  isDarkMode: localStorage.getItem("theme") === "dark" ? true : false,
  setIsDarkMode: () => {},
});
const ThemeContextProvider = (props: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    localStorage.getItem("theme") === "dark" ? true : false
  );

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        setIsDarkMode,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
