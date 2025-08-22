import React from "react";
import "../App.css";

const foodData = [
  { id: 1, name: "Pizza", img: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=800&q=80" },
  { id: 2, name: "Burger", img: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80" },
  { id: 3, name: "Pasta", img: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80" },
  { id: 4, name: "Salad", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80" },
];

const FoodItems = () => {
  return (
    <section className="food-section">
      <h2>Popular Dishes</h2>
      <div className="food-grid">
        {foodData.map(item => (
          <div key={item.id} className="food-card">
            <img src={item.img} alt={item.name} />
            <h3>{item.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FoodItems;
