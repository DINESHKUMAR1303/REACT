import React from "react";
import pastaImg from "../images/pasta.jpg";

const Pasta = () => {
  return (
    <div className="item-card">
      <img src={pastaImg} alt="Pasta" />
      <h3>Italian Pasta</h3>
      <p>Rich and creamy pasta for pasta lovers.</p>
    </div>
  );
};

export default Pasta;
