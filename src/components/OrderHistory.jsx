import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import "./OrderHistory.css"; // Assuming you have a CSS file for styling

const OrderHistory = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        setLoading(true);
        // Fetch order history from the server
        const response = await axios.get('https://a714-2400-adc5-453-1500-60e3-4d57-bdbb-a819.ngrok-free.app/api/order/history');
        if (response.status === 200) {
          setOrders(response.data.orders);
        } else {
          console.error('Error fetching order history:', response.data.error);
        }
      } catch (error) {
        console.error('Error fetching order history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  return (
    <div className="order-history-container">
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div>
          <h2>Order History</h2>
          {orders && orders.length > 0 ? (
            <ul className="order-list">
              {orders.map((order) => (
                <li key={order.id} className="order-item">
                  <div>Order ID: {order.id}</div>
                  <div>Order Date: {order.createdAt}</div>
                  {/* Add more details you want to display */}
                </li>
              ))}
            </ul>
          ) : (
            <p>No orders found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
