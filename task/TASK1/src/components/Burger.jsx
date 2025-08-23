import React from "react";
import burgerImg from "../images/burger.jpg";

const Burger = () => {
  return (
    <div className="item-card">
      <img src={burgerImg} alt="Burger" />
      <h3>Juicy Burger</h3>
      <p>Perfectly grilled burger with fresh veggies.</p>
    </div>
  );
};

export default Burger;
