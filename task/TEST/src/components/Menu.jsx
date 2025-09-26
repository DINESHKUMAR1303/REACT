import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Menu.css";

const Menu = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();

  // ✅ Check login status
  const isLoggedIn = localStorage.getItem("user");

  const items = [
    { id: 1, name: "Margherita Pizza", category: "Pizza", price: 299, desc: "Classic cheese & tomato" },
    { id: 2, name: "Pepperoni Pizza", category: "Pizza", price: 349, desc: "Cheesy & spicy pepperoni" },
    { id: 3, name: "Veg Burger", category: "Burger", price: 199, desc: "Crispy veggie patty" },
    { id: 4, name: "Cheese Burger", category: "Burger", price: 249, desc: "Juicy beef & cheese" },
    { id: 5, name: "Alfredo Pasta", category: "Pasta", price: 229, desc: "Creamy white sauce" },
    { id: 6, name: "Arrabbiata Pasta", category: "Pasta", price: 239, desc: "Spicy tomato sauce" },
    { id: 7, name: "Caesar Salad", category: "Salad", price: 149, desc: "Fresh & healthy" },
    { id: 8, name: "Greek Salad", category: "Salad", price: 159, desc: "Olives, feta, cucumber" },
  ];

  // 🔍 Filter items
  const filteredItems = items.filter(
    (item) =>
      (category === "All" || item.category === category) &&
      item.name.toLowerCase().includes(search.toLowerCase())
  );

  // 🛒 Add to cart
  const handleAddToCart = (item) => {
    if (!isLoggedIn) {
      navigate("/login"); 
    } else {
      alert(`${item.name} added to cart!`);
    }
  };

  // 🚪 Logout handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="menu-page">
      <div className="menu-header">
        <h1>Our Menu</h1>

        {/* 🔑 Login / Logout buttons */}
        <div>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="login-btn">Login</button>
            </Link>
          )}
        </div>
      </div>

      {/* 🔍 Search bar */}
      <input
        type="text"
        placeholder="Search dishes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 📂 Categories */}
      <div className="categories">
        {["All", "Pizza", "Burger", "Pasta", "Salad"].map((cat) => (
          <button
            key={cat}
            className={category === cat ? "active" : ""}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🍽️ Menu Items */}
      <div className="menu-list">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.id} className="menu-card">
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
              <p>₹{item.price}</p>
              <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
            </div>
          ))
        ) : (
          <p>No items found.</p>
        )}
      </div>
    </div>
  );
};

export default Menu;
