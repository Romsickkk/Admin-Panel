// import {
//   createContext,
//   ReactNode,
//   useContext,
//   useEffect,
//   useCallback,
// } from "react";
// import { useLocalStorageState } from "../hooks/useLocalStorage";

// type DarkModeContextType = {
//   isDarkMode: boolean;
//   toggleDarkMode: () => void;
// };

// // Указываем null как значение по умолчанию
// const DarkModeContext = createContext<DarkModeContextType | null>(null);

// type DarkModeProviderProps = {
//   children: ReactNode;
// };

// function DarkModeProvider({ children }: DarkModeProviderProps) {
//   const [isDarkMode, setIsDarkMode] = useLocalStorageState<boolean>(
//     window.matchMedia("(prefers-color-scheme: dark)").matches,
//     "isDarkMode"
//   );

//   const toggleDarkMode = useCallback(() => {
//     setIsDarkMode((prev: boolean) => !prev);
//   }, [setIsDarkMode]);

//   useEffect(() => {
//     const htmlElement = document.documentElement;
//     if (isDarkMode) {
//       htmlElement.classList.add("dark-mode");
//       htmlElement.classList.remove("light-mode");
//     } else {
//       htmlElement.classList.remove("dark-mode");
//       htmlElement.classList.add("light-mode");
//     }
//   }, [isDarkMode]);

//   return (
//     <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
//       {children}
//     </DarkModeContext.Provider>
//   );
// }

// function useDarkMode() {
//   const context = useContext(DarkModeContext);
//   if (context === null) {
//     throw new Error("useDarkMode must be used within a DarkModeProvider");
//   }
//   return context;
// }

// export { DarkModeProvider, useDarkMode };
