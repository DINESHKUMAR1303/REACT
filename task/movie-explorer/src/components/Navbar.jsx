import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = ({ onSearch, previous }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [term, setTerm] = useState("");

  // debounce 300ms
  useEffect(() => {
    const t = setTimeout(() => onSearch(term.trim()), 300);
    return () => clearTimeout(t);
  }, [term, onSearch]);

  return (
    <header className="navbar">
      <div className="navbar-inner container">
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 20, color: "var(--accent)" }}>Movie Explorer</div>
        </div>

        <div style={{ flex: 1 }}>
          <input
            className="search-box"
            placeholder="Search shows (e.g., friends, game of thrones)..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
          {previous ? <div className="prev-search">Previous search: <strong>{previous}</strong></div> : null}
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button className="page-btn" onClick={toggleTheme}>
            {theme === "light" ? "Dark" : "Light"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
