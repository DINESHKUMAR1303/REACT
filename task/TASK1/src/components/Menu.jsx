import React from "react";
import { Link, Outlet } from "react-router-dom";

const Menu = () => {
  return (
    <div className="menu-page">
      <h1>Our Menu</h1><br /><hr /><br />
      <ul className="menu-links">
        <li><Link to="pizza">Pizza</Link></li>
        <li><Link to="burger">Burger</Link></li>
        <li><Link to="pasta">Pasta</Link></li>
        <li><Link to="salad">Salad</Link></li>
      </ul>
      <Outlet />
    </div>
  );
};

export default Menu;
