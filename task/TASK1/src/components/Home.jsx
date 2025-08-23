import React from "react";
import heroImage from "../images/food.jpg";

const Home = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          Taste the <span>Best</span> Food in Town
        </h1>
        <p>
          Fresh ingredients, delicious flavors, and quick delivery – all at your fingertips.
        </p>
        <div className="hero-buttons">
          <button className="btn primary-btn">Order Now</button>
          <button className="btn secondary-btn">View Menu</button>
        </div>
      </div>
      <div className="hero-image-container">
        <img src={heroImage} alt="Delicious Pizza" className="hero-image" />
      </div>
    </section>
  );
};

export default Home;
