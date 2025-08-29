import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";


function Navbar() {
  const cartItems = useSelector((state) => state.cart.items);
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="logo">🍽 Foodie</div>
      <ul className="nav-links">
        <li>
          <Link className={location.pathname === "/" ? "active" : ""} to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className={location.pathname === "/menu" ? "active" : ""} to="/menu">
            Menu
          </Link>
        </li>
        <li>
          <Link className={location.pathname === "/contact" ? "active" : ""} to="/contact">
            Contact
          </Link>
        </li>
        <li>
          <Link className={location.pathname === "/cart" ? "active" : ""} to="/cart">
            🛒 <span className="cart-count">{cartItems.length}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
