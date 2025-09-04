import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const cartItems = useSelector((state) => state.cart.items);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  const totalCartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="navbar">
      <div className="logo">🍽 Foodie</div>

      
      <div className="menu-toggle" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>

     
      <ul className={`nav-links ${isOpen ? "active" : ""}`}>
        <li>
          <Link
            className={location.pathname === "/" ? "active" : ""}
            to="/"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className={location.pathname === "/menu" ? "active" : ""}
            to="/menu"
            onClick={() => setIsOpen(false)}
          >
            Menu
          </Link>
        </li>
        <li>
          <Link
            className={location.pathname === "/contact" ? "active" : ""}
            to="/contact"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
        </li>

       
        <li>
          <Link
            className={location.pathname === "/fetch" ? "active" : ""}
            to="/fetch"
            onClick={() => setIsOpen(false)}
          >
            API Demo
          </Link>
        </li>

        <li>
          <Link
            className={location.pathname === "/cart" ? "active" : ""}
            to="/cart"
            onClick={() => setIsOpen(false)}
          >
            🛒 ({totalCartQuantity})
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
