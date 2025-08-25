import React from "react";
import pizzaImg from "../images/pizza.jpg";

const Pizza = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h3>Delicious Pizza</h3>
      <img src={pizzaImg} alt="Pizza" style={{ width: "300px", borderRadius: "10px", marginTop: "10px" }} />
      <p>Enjoy our cheesy, freshly baked pizzas with rich toppings.</p>
    </div>
  );
};

export default Pizza;
