import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartslice";

const menuData = {
  Pizza: [
    { id: 1, name: "Margherita Pizza", description: "Classic delight with fresh tomatoes and basil", price: 250, img: "/images/Margheritapizza.jpg" },
    { id: 2, name: "Pepperoni Pizza", description: "Loaded with spicy pepperoni & cheese", price: 350, img: "/images/Pepperonipizza.jpg" },
    { id: 3, name: "BBQ Chicken Pizza", description: "Smoky BBQ chicken with extra cheese", price: 400, img: "/images/bbqpizza.webp" }
  ],
  Burger: [
    { id: 4, name: "Cheese Burger", description: "Juicy beef patty with melted cheese", price: 180, img: "/images/cheeseburger.jpg" },
    { id: 5, name: "Veggie Burger", description: "Crispy veggie patty with fresh veggies", price: 150, img: "/images/veggieburger.jpg" },
    { id: 6, name: "Chicken Burger", description: "Grilled chicken patty with spicy mayo", price: 200, img: "/images/chickenburger.jpg" }
  ],
  Pasta: [
    { id: 7, name: "White Sauce Pasta", description: "Creamy Alfredo pasta with herbs", price: 220, img: "/images/whitepasta.png" },
    { id: 8, name: "Red Sauce Pasta", description: "Tangy tomato sauce with Italian spices", price: 200, img: "/images/redpasta.png" },
    { id: 9, name: "Pesto Pasta", description: "Green pesto with parmesan cheese", price: 240, img: "/images/pestopasta.jpg" }
  ],
  Salad: [
    { id: 10, name: "Caesar Salad", description: "Crisp lettuce, parmesan, and croutons", price: 120, img: "/images/caesarsalad.jpg" },
    { id: 11, name: "Greek Salad", description: "Fresh veggies with feta cheese", price: 140, img: "/images/Greeksalad.webp" },
    { id: 12, name: "Fruit Salad", description: "Fresh seasonal fruits with honey drizzle", price: 160, img: "/images/fruitsalad.jpg" }
  ]
};

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartItems, setCartItems] = useState({});
  const dispatch = useDispatch();

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
