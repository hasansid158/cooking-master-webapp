import "./ThemeSelector.css";
import { UseThemeContext } from "../../Hooks/UseThemeContext/useThemeContext";

export default function ThemeSelector() {
  const { changeColor } = UseThemeContext();

  const themeColors = ["steelblue", "indianred", "teal"];

  return (
    <div className="theme-selector">
      <div className="theme-buttons">
        {themeColors.map((color, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                changeColor(color);
              }}
              style={{ background: color }}
            />
          );
        })}
      </div>
    </div>
  );
}
