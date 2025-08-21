import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Service from "./pages/Service";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      
      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/service" style={styles.link}>Service</Link>
        <Link to="/abb" style={styles.link}>About</Link>
        <Link to="/con" style={styles.link}>Contact</Link>
      </nav>

      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/service" element={<Service />} />
        <Route path="/abb" element={<About />} />
        <Route path="/con" element={<Contact />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

const styles = {
  nav: {
    backgroundColor: "#333",
    padding: "10px",
    textAlign: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
    margin: "0 15px",
    fontSize: "18px",
  }
};

export default App;
