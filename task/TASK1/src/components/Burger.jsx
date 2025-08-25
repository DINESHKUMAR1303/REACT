import React from "react";
import burgerImg from "../images/burger.jpg";

const Burger = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h3>Juicy Burger</h3>
      <img src={burgerImg} alt="Burger" style={{ width: "300px", borderRadius: "10px", marginTop: "10px" }} />
      <p>Our burgers are loaded with flavors and served fresh.</p>
    </div>
  );
};

export default Burger;
