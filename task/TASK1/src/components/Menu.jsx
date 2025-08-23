import React from "react";
import { Outlet, Link } from "react-router-dom";

const Menu = () => {
  return (
    <section className="menu-section">
      <h2>Our Menu</h2><br /><hr /><br />
      <div className="menu-links">
        <Link to="pizza">Pizza</Link>
        <Link to="burger">Burger</Link>
        <Link to="pasta">Pasta</Link>
        <Link to="salad">Salad</Link>
      </div>
      <Outlet />
    </section>
  );
};

export default Menu;
