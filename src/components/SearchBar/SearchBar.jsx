import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import "./SearchBar.css";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useRef(useNavigate());

  useEffect(() => {
    navigate.current("/search?q=" + searchTerm);
  }, [searchTerm, navigate]);

  return (
    <div className="search-bar">
      <form>
        <label>
          <span>Search</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </label>
      </form>
    </div>
  );
}
