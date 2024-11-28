import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function OrderConfirmation() {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // In a real application, you would fetch the order details from your backend
    // Here, we'll simulate this by using data from localStorage
    const simulateOrderFetch = () => {
      const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      const orderNumber = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit order number
      const orderDate = new Date().toLocaleDateString();
      const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      const orderData = {
        orderNumber,
        orderDate,
        items: cartItems,
        total,
        shippingAddress: JSON.parse(localStorage.getItem('shippingInfo')) || {},
      };

      setOrder(orderData);
      
      // Clear the cart and shipping info from localStorage
      localStorage.removeItem('cart');
      localStorage.removeItem('shippingInfo');
    };

    simulateOrderFetch();
  }, []);

  if (!order) {
    return <div>Loading order details...</div>;
  }

  return (
    <div className="order-confirmation">
      <h2>Thank You for Your Order!</h2>
      <p>Your order has been successfully placed.</p>
      <div className="order-details">
        <h3>Order Details</h3>
        <p><strong>Order Number:</strong> {order.orderNumber}</p>
        <p><strong>Order Date:</strong> {order.orderDate}</p>
        <h4>Items Ordered:</h4>
        <ul>
          {order.items.map((item, index) => (
            <li key={index}>
              {item.name} - Quantity: {item.quantity} - ${(item.price * item.quantity).toFixed(2)}
            </li>
          ))}
        </ul>
        <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
        <h4>Shipping Address:</h4>
        <p>{order.shippingAddress.fullName}</p>
        <p>{order.shippingAddress.address}</p>
        <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
        <p>{order.shippingAddress.country}</p>
      </div>
      <button onClick={() => navigate('/')}>Continue Shopping</button>
    </div>
  );
}

export default OrderConfirmation;