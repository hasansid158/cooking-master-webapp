import "./Navbar.css";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { useContext } from "react";
import { ThemeProvider } from "../../Hooks/UseThemeContext/useThemeContext";

export default function Navbar() {
  const { color } = ThemeProvider();

  return (
    <div className="navbar" style={{ backgroundColor: color }}>
      <nav>
        <Link to="/" className="brand">
          <h1>Cooking Master</h1>
        </Link>
        <SearchBar className="search-bar" />
        <Link to="/create">
          <h1>Create Recipe</h1>
        </Link>
      </nav>
    </div>
  );
}
