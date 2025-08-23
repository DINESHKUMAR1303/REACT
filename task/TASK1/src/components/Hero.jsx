import React from "react";
import heroImage from "../images/pizza.jpg";

const Hero = () => {
  return (
    <section className="hero">
      <img src={heroImage} alt="Delicious Pizza" className="hero-image" />
      <div className="hero-text">
        <h1>Welcome to Foodies</h1>
        <p>Your favorite meals delivered fresh and fast!</p>
      </div>
    </section>
  );
};

export default Hero;
