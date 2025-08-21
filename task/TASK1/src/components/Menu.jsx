import React from "react";

export default function Menu() {
  const items = [
    { name: "Pizza", price: "$12", img: "https://via.placeholder.com/150" },
    { name: "Burger", price: "$8", img: "https://via.placeholder.com/150" },
    { name: "Pasta", price: "$10", img: "https://via.placeholder.com/150" },
  ];

  return (
    <section className="section">
      <h1>Our Menu</h1>
      <div className="menu-grid">
        {items.map((item, index) => (
          <div className="menu-card" key={index}>
            <img src={item.img} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
