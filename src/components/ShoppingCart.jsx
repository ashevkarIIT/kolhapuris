import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Styles/shoppingCart.css";
import { RiDeleteBinLine } from "react-icons/ri";
import Confetti from "react-confetti";

function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false); // New state for order status
  const navigate = useNavigate();

  useEffect(() => {
    // Load cart items from localStorage
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (id, newQuantity) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    );
    updateCart(updatedCart);
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    updateCart(updatedCart);
  };

  const calculateTotal = () => {
    console.log(cartItems);
    return cartItems.reduce(
      (total, item) => total + Number(item.price.substring(1)) * item.quantity,
      0
    );
  };

  const handleCheckout = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      // If not logged in, redirect to the login page
      navigate("/login");
    } else {
      // If logged in, proceed with the checkout
      setOrderPlaced(true);
      localStorage.removeItem("cart");
      setCartItems([]);
    }
  };

  if (orderPlaced) {
    return (
      <div className="order-placed">
        <Confetti width={1800} height={500} />
        <h2>Thank you for your order!</h2>
        <p>Your order has been successfully placed.</p>
        <button onClick={() => navigate("/products")}>Continue Shopping</button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate("/products")}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="shopping-cart">
      <h2>Your Shopping Cart</h2>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="item-image">
              <img
                src={item.imageUrls[0]}
                alt={item.name}
                className="prd-image"
              />
            </div>
            <div className="item-details">
              <h3>{item.name}</h3>
              <p>Price: ${Number(item.price.substring(1)).toFixed(2)}</p>
              <div className="quantity-control">
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity - 1)
                  }
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity + 1)
                  }
                >
                  +
                </button>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="remove-btn"
                >
                  <RiDeleteBinLine />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h2>Summary</h2>

        <div className="summary-row">
          <span>Subtotal</span>
          <span>${calculateTotal().toFixed(2)}</span>
        </div>

        <div className="summary-row">
          <span>Estimated Shipping & Handling</span>
          <span>Free</span>
        </div>

        <div className="summary-row">
          <span>Estimated Tax</span>
          <span>—</span>
        </div>

        <div className="summary-row">
          <strong>Total</strong>
          <strong>${calculateTotal().toFixed(2)}</strong>
        </div>

        <div className="shipping-info">
          <p>Members get free shipping on orders $50.00+</p>
          <div className="free-shipping-progress">
            <div
              className="progress-bar"
              style={{
                width: `${Math.min((calculateTotal() / 50) * 100, 100)}%`,
              }}
            ></div>
          </div>
        </div>

        <button className="checkout-button" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default ShoppingCart;
