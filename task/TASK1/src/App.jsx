import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Contact from "./components/Contact";
import Pizza from "./components/Pizza";
import Burger from "./components/Burger";
import Pasta from "./components/Pasta";
import Salad from "./components/Salad";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />}>
          <Route path="pizza" element={<Pizza />} />
          <Route path="burger" element={<Burger />} />
          <Route path="pasta" element={<Pasta />} />
          <Route path="salad" element={<Salad />} />
        </Route>
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;