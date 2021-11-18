import { createContext } from "react";

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  return (
    <ThemeContext.Provider value={{ color: "steelblue" }}>
      {children}
    </ThemeContext.Provider>
  );
}
