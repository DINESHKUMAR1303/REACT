import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartslice";

const Menu = () => {
  const [menuData, setMenuData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartItems, setCartItems] = useState({});
  const dispatch = useDispatch();

 
  useEffect(() => {
    fetch("/menu.json")
      .then((res) => res.json())
      .then((data) => setMenuData(data))
      .catch((err) => console.error("Error loading menu:", err));
  }, []);

  const handleUpdateCart = (item, action) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (action === "add") {
        updated[item.id] = { ...item, quantity: 1 };
        dispatch(addToCart(item));
      } else if (action === "increase") {
        updated[item.id].quantity += 1;
        dispatch(addToCart(item));
      } else if (action === "decrease") {
        if (updated[item.id].quantity > 1) {
          updated[item.id].quantity -= 1;
        } else {
          delete updated[item.id];
        }
      }
      return updated;
    });
  };

  const filteredMenu = Object.entries(menuData).reduce((acc, [category, items]) => {
    if (selectedCategory !== "All" && selectedCategory !== category) return acc;
    const filteredItems = items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filteredItems.length) acc.push({ category, items: filteredItems });
    return acc;
  }, []);

  return (
    <div className="menu-page">
      {/* ✅ Header */}
      <div className="menu-header">
        <h1>🍽 Our Delicious Menu</h1>
        <p>Choose your favorite and enjoy the taste of perfection!</p>
      </div>

      {/* ✅ Search & Filters */}
      <div className="menu-controls">
        <input
          type="text"
          placeholder="Search food..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />

        <div className="category-buttons">
          {["All", "Pizza", "Burger", "Pasta", "Salad"].map(cat => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ✅ Menu Items */}
      <div className="menu-categories">
        {filteredMenu.length === 0 ? (
          <p className="no-items">No items found.</p>
        ) : (
          filteredMenu.map(({ category, items }) => (
            <div key={category} className="menu-section">
              <h2 className="category-title">{category}</h2>
              <div className="menu-grid">
                {items.map((item) => {
                  const quantity = cartItems[item.id]?.quantity || 0;
                  return (
                    <div className="menu-card" key={item.id}>
                      <img src={item.img} alt={item.name} className="menu-img" />
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>
                      <span className="menu-price">₹ {item.price}</span>
                      
                      {/*  Quantity Control */}
                      <div className="quantity-control">
                        {quantity > 0 ? (
                          <div className="quantity-stepper">
                            <button
                              className="qty-btn"
                              onClick={() => handleUpdateCart(item, "decrease")}
                            >
                              -
                            </button>
                            <span className="qty-count">{quantity}</span>
                            <button
                              className="qty-btn"
                              onClick={() => handleUpdateCart(item, "increase")}
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            className="add-to-cart-btn"
                            onClick={() => handleUpdateCart(item, "add")}
                          >
                            Add
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Menu;
