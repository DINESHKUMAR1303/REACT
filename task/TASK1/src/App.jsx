import React, { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Service";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import "./App.css";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <div className="logo">MyWebsite</div>
      <nav className={isOpen ? "nav open" : "nav"}>
        <NavLink to="/" className="link" activeclassname="active">Home</NavLink>
        <NavLink to="/services" className="link" activeclassname="active">Services</NavLink>
        <NavLink to="/about" className="link" activeclassname="active">About</NavLink>
        <NavLink to="/contact" className="link" activeclassname="active">Contact</NavLink>
      </nav>
      <button className="toggleBtn" onClick={() => setIsOpen(!isOpen)}>☰</button>
    </header>
  );
};


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
