// OrderHistory.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import './OrderHistory.css'

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const userId = user.id;
        const response = await axios.get(`https://a8ff-111-88-233-53.ngrok-free.app/api/order/history/${userId}`,{
          headers:{
            "ngrok-skip-browser-warning": "avoid"
          }
        });
        setOrders(response.data.orders);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order history:', error);
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  return (
    <div className="order-history">
      <h2>Order History</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.UserId}>
              <p>Status: {order.status}</p>
              <h4>Cart Items:</h4>
              <ul>
                {order.CartItems.map((cartItem) => (
                  <li key={cartItem.id}>
                    <img
                      className="product-image-1"
                      src={`https://a8ff-111-88-233-53.ngrok-free.app${cartItem.Product.productImage}`}
                    />
                    <p>Product Name: {cartItem.Product.productName}</p>
                    <p>Product Price: {cartItem.Product.productPrice}</p>
                    <p>Quantity: {cartItem.quantity}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
