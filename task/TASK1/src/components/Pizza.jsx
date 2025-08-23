import React from "react";
import pizzaImg from "../images/pizza.jpg";

const Pizza = () => {
  return (
    <div className="item-card">
      <img src={pizzaImg} alt="Pizza" />
      <h3>Delicious Pizza</h3>
      <p>Cheesy and tasty pizza just for you.</p>
    </div>
  );
};

export default Pizza;
