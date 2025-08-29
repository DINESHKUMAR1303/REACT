import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Contact from "./components/Contact";
import Pizza from "./components/Pizza";
import Burger from "./components/Burger";
import Pasta from "./components/Pasta";
import Salad from "./components/Salad";
import Cart from "./components/Cart";  // 
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />}>
            <Route path="pizza" element={<Pizza />} />
            <Route path="burger" element={<Burger />} />
            <Route path="pasta" element={<Pasta />} />
            <Route path="salad" element={<Salad />} />
          </Route>
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} /> 
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
