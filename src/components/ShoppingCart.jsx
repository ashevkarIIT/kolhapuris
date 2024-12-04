import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/shoppingCart.css'
import { RiDeleteBinLine } from "react-icons/ri";



function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load cart items from localStorage
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, []);

  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
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
    return cartItems.reduce((total, item) => total + Number(item.price.substring(1)) * item.quantity, 0);
  };

  // const handleCheckout = () => {
  //   localStorage.removeItem('cart');
  //   setCartItems([]);
  //   alert('Thank you for your purchase!');
  //   navigate('/');
  // };

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/products')}>Continue Shopping</button>
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
                <img src={item.imageUrls[0]} alt={item.name} className="product-image" />
            </div>
            <div className="item-details">
              <h3>{item.name}</h3>
              <p>Price: ${Number(item.price.substring(1)).toFixed(2)}</p>
              <div className="quantity-control">
              <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
              <button onClick={() => handleRemoveItem(item.id)} className="remove-btn">
              <RiDeleteBinLine />
            </button>
            </div>
            </div>
            
            <p>Subtotal: ${(Number(item.price.substring(1)) * item.quantity).toFixed(2)}</p>
            
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
      <div className="progress-bar" style={{width: `${(calculateTotal() / 50) * 100}%`}}></div>
    </div>
    <p>$50</p>
  </div>

  <button className="checkout-button">Checkout</button>  
</div>
    </div>
  );
}

export default ShoppingCart;
