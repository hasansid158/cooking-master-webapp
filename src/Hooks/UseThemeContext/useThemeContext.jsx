import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export function UseThemeContext() {
  if (ThemeContext === undefined) {
    throw console.error("The component is not wrapped with ContextProvider!");
  }

  const themeColor = useContext(ThemeContext);

  return themeColor;
}
