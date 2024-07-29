import { createContext, useContext, useState, useEffect } from "react";


// const ThemeColourContext = createContext();

// export const useThemeContext = () => useContext(ThemeColourContext);

// export const ThemeColourProvider = ({ children }) => {
//   const [themeMode, setThemeMode] = useState("dark");

//   useEffect(() => {
//     const getThemeStatus = () => {
//         if(themeMode === "light") {
//             setThemeMode("dark")
//         } else if (themeMode === "dark") {
//             setThemeMode("light")
//         } else {
//             setThemeMode("light")
//         }

//     };
//     getThemeStatus();
//   }, []);

//   return <ThemeColourContext.Provider value={{ themeMode: themeMode, setThemeMode: setThemeMode }}>{children}</ThemeColourContext.Provider>;
// };

export const ColorModeContext = createContext({ toggleColorMode: () => {} });