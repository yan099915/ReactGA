import "./Navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../assets/img/LOGO.png";
import boy from "../assets/img/Boy.png";
import girl from "../assets/img/Girl.png";

const Navbar = ({ click }) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  return (
    <nav className="navbar">
      <a href="/">
        <img src={logo} alt="logo" className="logo" />
      </a>
      <a href="/boy" className="boy">
        <img src={boy} alt="logo" className="logo" />
      </a>
      <a href="/girl" className="girl">
        <img src={girl} alt="logo" className="logo" />
      </a>
      <ul className="navbar__links">
        <li>
          <Link to="/cart" className="cart__link">
            <i className="fas fa-shopping-cart"></i>
            <span>
              Cart <span className="cartlogo__badge">{getCartCount()}</span>
            </span>
          </Link>
        </li>
      </ul>
      <div className="hamburger__menu" onClick={click}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
};

export default Navbar;
