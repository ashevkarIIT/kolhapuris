import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
    return cartItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0);
  };

  const handleCheckout = () => {
    localStorage.removeItem('cart');
    setCartItems([]);
    alert('Thank you for your purchase!');
    navigate('/');
  };

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
            <div className="item-details">
              <h3>{item.name}</h3>
              <p>Price: ${Number(item.price).toFixed(2)}</p>
            </div>
            <div className="quantity-control">
              <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
            </div>
            <p>Subtotal: ${(Number(item.price) * item.quantity).toFixed(2)}</p>
            <button onClick={() => handleRemoveItem(item.id)} className="remove-btn">
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Total: ${calculateTotal().toFixed(2)}</h3>
        <button onClick={handleCheckout}>Proceed to Checkout</button>
        <button onClick={() => navigate('/products')}>Continue Shopping</button>
      </div>
    </div>
  );
}

export default ShoppingCart;
