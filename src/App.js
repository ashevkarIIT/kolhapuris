import { Routes, Route } from "react-router-dom";
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

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

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
