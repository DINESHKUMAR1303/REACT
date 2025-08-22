import React from "react";
import "../App.css";

const menuItems = [
  { name: "Pizza", price: "$10", desc: "Delicious cheesy pizza with fresh toppings" },
  { name: "Burger", price: "$8", desc: "Juicy beef burger with crispy fries" },
  { name: "Pasta", price: "$9", desc: "Creamy pasta with Italian flavors" },
  { name: "Salad", price: "$6", desc: "Fresh and healthy vegetable salad" },
];

const Menu = () => {
  return (
    <section className="menu-page">
      <h2>Our Menu</h2>
      <div className="menu-list">
        {menuItems.map((item, index) => (
          <div key={index} className="menu-card">
            <h3>{item.name}</h3>
            <p>{item.desc}</p>
            <span>{item.price}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Menu;
