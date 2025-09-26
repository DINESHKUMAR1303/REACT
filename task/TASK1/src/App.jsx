import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Contact from "./components/Contact";
import Pizza from "./components/Pizza";
import Burger from "./components/Burger";
import Pasta from "./components/Pasta";
import Salad from "./components/Salad";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
// import UsingFetch from "./components/UsingFetch";   
import "./App.css";

function App() {
  const location = useLocation();

  const hideNavbarFooter = ["/login", "/signup"].includes(location.pathname);

  return (
    <div className="app-container">
      {!hideNavbarFooter && <Navbar />}

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />}>
            <Route path="burger" element={<Burger />} />
            <Route path="pasta" element={<Pasta />} />
            <Route path="salad" element={<Salad />} />
            <Route path="pizza" element={<Pizza />} />
          </Route>
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

         
          {/* <Route path="/fetch" element={<UsingFetch />} />  */}
        </Routes>
      </div>

      {!hideNavbarFooter && <Footer />}
    </div>
  );
}

export default App;
