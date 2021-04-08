import "./Navbar.css";

import logo from "../assets/img/LOGO.png";

const Footer = ({ click }) => {
  return (
    <nav className="navbar">
      <a href="/">
        <img src={logo} alt="logo" className="logo" />
      </a>
      <ul className="navbar__links"></ul>
    </nav>
  );
};

export default Footer;
