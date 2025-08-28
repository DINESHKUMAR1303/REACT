import React, { useState } from "react";

const menuData = {
  Pizza: [
    {
      name: "Margherita Pizza",
      description: "Classic delight with fresh tomatoes and basil",
      price: "₹ 250",
      img: "/images/Margheritapizza.jpg"
    },
    {
      name: "Pepperoni Pizza",
      description: "Loaded with spicy pepperoni & cheese",
      price: "₹ 350",
      img: "/images/Pepperonipizza.jpg"
    },
    {
      name: "BBQ Chicken Pizza",
      description: "Smoky BBQ chicken with extra cheese",
      price: "₹ 400",
      img: "/images/bbqpizza.webp"
    }
  ],

  Burger: [
    {
      name: "Cheese Burger",
      description: "Juicy beef patty with melted cheese",
      price: "₹ 180",
      img: "/images/cheeseburger.jpg"
    },
    {
      name: "Veggie Burger",
      description: "Crispy veggie patty with fresh veggies",
      price: "₹ 150",
      img: "/images/veggieburger.jpg"
    },
    {
      name: "Chicken Burger",
      description: "Grilled chicken patty with spicy mayo",
      price: "₹ 200",
      img: "/images/chickenburger.jpg"
    }
  ],

  Pasta: [
    {
      name: "White Sauce Pasta",
      description: "Creamy Alfredo pasta with herbs",
      price: "₹ 220",
      img: "/images/whitepasta.png"
    },
    {
      name: "Red Sauce Pasta",
      description: "Tangy tomato sauce with Italian spices",
      price: "₹ 200",
      img: "/images/redpasta.png"
    },
    {
      name: "Pesto Pasta",
      description: "Green pesto with parmesan cheese",
      price: "₹ 240",
      img: "/images/pestopasta.jpg"
    }
  ],

  Salad: [
    {
      name: "Caesar Salad",
      description: "Crisp lettuce, parmesan, and croutons",
      price: "₹ 120",
      img: "/images/caesarsalad.jpg"
    },
    {
      name: "Greek Salad",
      description: "Fresh veggies with feta cheese",
      price: "₹ 140",
      img: "/images/Greeksalad.webp"
    },
    {
      name: "Fruit Salad",
      description: "Fresh seasonal fruits with honey drizzle",
      price: "₹ 160",
      img: "/images/fruitsalad.jpg"
    }
  ]
};

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filterItems = (items) => {
    return items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="menu-page">
      {/* Header */}
      <div className="menu-header">
        <h1>🍽 Our Delicious Menu</h1>
        <p>Choose your favorite and enjoy the taste of perfection!</p>
      </div>

      {/* Search & Category Filters */}
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

      {/* Menu by Category */}
      <div className="menu-categories">
        {Object.entries(menuData).map(([category, items]) => {
          if (selectedCategory !== "All" && selectedCategory !== category) {
            return null; // Skip categories that are not selected
          }

          const filtered = filterItems(items);
          if (filtered.length === 0) return null; // Skip empty sections

          return (
            <div key={category} className="menu-section">
              <h2 className="category-title">{category}</h2>
              <div className="menu-grid">
                {filtered.map((item, idx) => (
                  <div className="menu-card" key={idx}>
                    <img src={item.img} alt={item.name} className="menu-img" />
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <span className="menu-price">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;