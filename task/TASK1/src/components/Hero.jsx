import React from "react";
import heroImg from "../images/food.jpg";
import "../App.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1>Delicious Food Delivered to Your Doorstep</h1>
        <p>Order your favorite meals anytime, anywhere.</p>
        <button className="order-btn">Order Now</button>
      </div>
      <div className="hero-image">
         <img src={heroImg} alt="Food" />
      </div>
    </section>
  );
};

export default Hero;
