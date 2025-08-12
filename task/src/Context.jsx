import React, { useState, useContext, createContext } from "react";

const TextStyleContext = createContext();


function TextStyleProvider({ children }) {
  const [style, setStyle] = useState({ fontSize: "20px", color: "black" });

  return (
    <TextStyleContext.Provider value={{ style, setStyle }}>
      {children}
    </TextStyleContext.Provider>
  );
}


function DisplayText() {
  const { style } = useContext(TextStyleContext);
  return (
    <h1 style={{ ...style, transition: "all 0.3s ease" }}>
     Glad to have you here 
    </h1>
  );
}


function StyleButtons() {
  const { setStyle } = useContext(TextStyleContext);

  const buttonStyle = {
    padding: "6px 12px",
    fontSize: "14px",
    border:" 1px solid transparent",
    borderRadius: "px",
    margin: "0 5px",
    cursor: "pointer",
    color: "white",
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
    >
      <button
        style={{ ...buttonStyle, backgroundColor: "red" }}
        onClick={() => setStyle({ fontSize: "20px", color: "red" })}
      >
        1
      </button>

      <button
        style={{ ...buttonStyle, backgroundColor: "blue" }}
        onClick={() => setStyle({ fontSize: "30px", color: "blue" })}
      >
        2
      </button>

      <button
        style={{ ...buttonStyle, backgroundColor: "green" }}
        onClick={() => setStyle({ fontSize: "40px", color: "green" })}
      >
        3
      </button>
    </div>
  );
}


export default function Context() {
  return (
    <TextStyleProvider>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <DisplayText />
        <StyleButtons />
      </div>
    </TextStyleProvider>
  );
}
