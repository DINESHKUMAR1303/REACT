import React from "react";
import pastaImg from "../images/pasta.jpg";

const Pasta = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h3>Italian Pasta</h3>
      <img src={pastaImg} alt="Pasta" style={{ width: "300px", borderRadius: "10px", marginTop: "10px" }} />
      <p>Rich and creamy pasta that melts in your mouth.</p>
    </div>
  );
};

export default Pasta;
