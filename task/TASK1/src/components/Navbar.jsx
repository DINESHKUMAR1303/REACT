import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../App.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setOpen(!open);

  return (
    <header className="header">
      <div className="logo">Foodies</div>
      <nav className={open ? "nav open" : "nav"}>
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
        <Link to="/menu" className={location.pathname === "/menu" ? "active" : ""}>Menu</Link>
        <Link to="/about" className={location.pathname === "/about" ? "active" : ""}>About</Link>
        <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>Contact</Link>
      </nav>
      <button className="toggleBtn" onClick={toggleMenu}>☰</button>
    </header>
  );
}
