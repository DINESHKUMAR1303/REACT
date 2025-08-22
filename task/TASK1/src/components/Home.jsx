import React from "react";
import FoodItems from "./FoodItems";
import "../App.css";

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to Foodie!</h1>
        <p>Your favorite meals delivered to your doorstep</p>
        <button className="order-btn">Order Now</button>
      </section>
      <FoodItems />
    </div>
  );
};

export default Home;
