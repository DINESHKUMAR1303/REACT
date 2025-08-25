import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Menu.css"; // Make sure to create this CSS file

const Menu = () => {
  return (
    <div className="menu-page">
      <div className="menu-header">
        <h1>🍽 Our Delicious Menu</h1>
        <p>Choose your favorite and enjoy the taste of perfection!</p>
      </div>

      <ul className="menu-links">
        <li><Link to="pizza">🍕 Pizza</Link></li>
        <li><Link to="burger">🍔 Burger</Link></li>
        <li><Link to="pasta">🍝 Pasta</Link></li>
        <li><Link to="salad">🥗 Salad</Link></li>
      </ul>

      <div className="menu-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Menu;
