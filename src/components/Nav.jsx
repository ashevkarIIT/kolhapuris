import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./Styles/Navbar.css";
import { useNavigate } from "react-router-dom";
import {
  RiLoginBoxLine,
  RiLogoutBoxLine,
  RiMenu3Line,
  RiCloseLine,
} from "react-icons/ri";
import { CgProfile } from "react-icons/cg";

const Nav = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <nav className="nav">
        {isLoggedIn ? (
          <li>
            <Link to="/profile">
              <CgProfile />
              Profile
            </Link>
          </li>
        ) : (
          <></>
        )}
        {isLoggedIn ? (
          <li onClick={handleLogout}>
            <Link to="/login">
              <RiLogoutBoxLine />
              Logout
            </Link>
          </li>
        ) : (
          <li>
            <Link to="/login">
              <RiLoginBoxLine />
              Login
            </Link>
          </li>
        )}
      </nav>
      <div className="main">
        <div className="logo">
          <Link to="/Home">
            <h1>Flip-Flops</h1>
          </Link>
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
          {menuOpen ? <RiCloseLine /> : <RiMenu3Line color="white" />}
        </button>
        <nav className={`navigation ${menuOpen ? "open" : ""}`}>
          <ul>
            <li>
              <Link to="/Home">Home</Link>
            </li>
            <li>
              <Link to="/products?gender=Women">Women</Link>
            </li>
            <li>
              <Link to="/products?gender=Men">Men</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Nav;
