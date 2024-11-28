import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const [step, setStep] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, []);

  const handleShippingInfoChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handlePaymentInfoChange = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // In a real application, you would send this data to your backend
      console.log('Order placed:', { cartItems, shippingInfo, paymentInfo });
      // Clear the cart
      localStorage.removeItem('cart');
      // Navigate to order confirmation
      navigate('/order-confirmation');
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="shipping-info">
            <h3>Shipping Information</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="fullName"
                value={shippingInfo.fullName}
                onChange={handleShippingInfoChange}
                placeholder="Full Name"
                required
              />
              <input
                type="text"
                name="address"
                value={shippingInfo.address}
                onChange={handleShippingInfoChange}
                placeholder="Address"
                required
              />
              <input
                type="text"
                name="city"
                value={shippingInfo.city}
                onChange={handleShippingInfoChange}
                placeholder="City"
                required
              />
              <input
                type="text"
                name="postalCode"
                value={shippingInfo.postalCode}
                onChange={handleShippingInfoChange}
                placeholder="Postal Code"
                required
              />
              <input
                type="text"
                name="country"
                value={shippingInfo.country}
                onChange={handleShippingInfoChange}
                placeholder="Country"
                required
              />
              <button type="submit">Next</button>
            </form>
          </div>
        );
      case 2:
        return (
          <div className="payment-info">
            <h3>Payment Information</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="cardNumber"
                value={paymentInfo.cardNumber}
                onChange={handlePaymentInfoChange}
                placeholder="Card Number"
                required
              />
              <input
                type="text"
                name="expiryDate"
                value={paymentInfo.expiryDate}
                onChange={handlePaymentInfoChange}
                placeholder="MM/YY"
                required
              />
              <input
                type="text"
                name="cvv"
                value={paymentInfo.cvv}
                onChange={handlePaymentInfoChange}
                placeholder="CVV"
                required
              />
              <button type="submit">Next</button>
            </form>
          </div>
        );
      case 3:
        return (
          <div className="order-summary">
            <h3>Order Summary</h3>
            {cartItems.map(item => (
              <div key={item.id} className="order-item">
                <span>{item.name}</span>
                <span>Quantity: {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="order-total">
              <strong>Total: ${calculateTotal().toFixed(2)}</strong>
            </div>
            <button onClick={handleSubmit}>Place Order</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      {renderStep()}
    </div>
  );
}

export default Checkout;