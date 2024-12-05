import { Routes, Route, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Home from "./components/Home";
import ProfileEdit from "./components/ProfileEdit";
import ProductListing from "./components/ProductListing";
import ProductDetails from "./components/ProductDetails";
import ShoppingCart from "./components/ShoppingCart";
import Checkout from "./components/Checkout";
import OrderConfirmation from "./components/OrderConfirmation";
import Nav from "./components/Nav";
import Footer from "./components/Footer"
import TermsOfService from "./components/TermsOfService";
import ContactUs from './components/ContactUs';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }

    const routeTitle = () => {
      switch (location.pathname) {
        case '/login':
          return "Login - Ethnics";
        case '/profile':
          return "Profile - Ethnics";
        case '/products':
          return "Products - Ethnics";
        case '/cart':
          return "Shopping Cart - Ethnics";
        case '/checkout':
          return "Checkout - Ethnics";
        case '/order-confirmation':
          return "Order Confirmation - Ethnics";
        case '/registration':
          return "Register - Ethnics";
        case '/terms':
          return "Terms of Service - Ethnics";
        case '/contact':
          return "Contact Us - Ethnics";
        default:
          return "Ethnics - Online Store"; // Default title
      }
    };

    document.title = routeTitle();

  }, [location]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <nav>
        <Nav isLoggedIn={isLoggedIn} onLogout={handleLogout} />{" "}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/profile" element={<ProfileEdit />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/home" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>

      <footer><Footer/></footer>
    </div>
  );
}

export default App;
