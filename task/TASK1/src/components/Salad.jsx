import React from "react";
import saladImg from "../images/salad.jpg";

const Salad = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h3>Fresh Salad</h3>
      <img src={saladImg} alt="Salad" style={{ width: "300px", borderRadius: "10px", marginTop: "10px" }} />
      <p>Healthy and refreshing salad with natural ingredients.</p>
    </div>
  );
};

export default Salad;
