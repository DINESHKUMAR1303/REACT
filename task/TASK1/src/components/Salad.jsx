import React from "react";
import saladImg from "../images/salad.jpg";

const Salad = () => {
  return (
    <div className="item-card">
      <img src={saladImg} alt="Salad" />
      <h3>Fresh Salad</h3>
      <p>Healthy and refreshing salad bowl.</p>
    </div>
  );
};

export default Salad;
