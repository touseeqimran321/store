import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./CartList.css";

const CartList = () => {
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState({ id: null, items: [] });

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userId = 5; // Replace with the actual user ID or get it from the user's authentication

        // Fetch cart items using Axios
        const response = await axios.get(`https://219f-2400-adc5-453-1500-1911-44a6-7f72-45aa.ngrok-free.app/api/cart/get?userId=${userId}`, {
          headers: { 'ngrok-skip-browser-warning': 'avoid' }
        });

        if (response.status === 200) {
          setCart({ id: response.data.cartId, items: response.data.cartItems });
        } else {
          // Handle error - you can update your UI accordingly
          console.error('Error fetching cart items:', response.data.error);
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle error - you can update your UI accordingly
      }
    };

    fetchCartItems();
  }, []);

  const handleCheckout = async () => {
    try {
      setLoading(true); 
      const userId = 5; // Replace with the actual user ID or get it from the user's authentication
      const cartId = 1; // Assuming you have the cart ID stored in your cart state
      
      // Perform Axios request for checkout
      const response = await axios.post('https://219f-2400-adc5-453-1500-1911-44a6-7f72-45aa.ngrok-free.app/api/order/checkout', {
        userId: userId,
        cartId: cartId,
      });

      // Check if the checkout was successful
      if (response.status === 201) {
        alert('Checkout successful');
        console.log("Checkout Successfully", response.data);
        // Optionally, you can handle further actions after successful checkout, such as redirecting the user to a thank you page or updating the UI.
      } else {
        // Handle error - you can update your UI accordingly
        console.error('No active item in the product:', response.data.error);
        alert('No active item');
      }
    } catch (error) {
      // Handle error - you can update your UI accordingly
      console.error('Error during checkout:', error);
      alert('Failed to checkout');
    } finally {
      setLoading(false); // Reset loading state regardless of the checkout result
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>
      {cart.items.length > 0 ? (
        <div>
          <ul className="cart-items">
            {cart.items.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={`https://219f-2400-adc5-453-1500-1911-44a6-7f72-45aa.ngrok-free.app${item.Product.productImage}`} alt={item.Product.productName} className="product-image" />
                <p className="product-name">{item.Product.productName}</p>
                <p className="product-price">{item.Product.productPrice}</p>
                <p className="quantity">Quantity: {item.quantity}</p>
                <p className="status">Status: {item.status}</p>
              </li>
            ))}
          </ul>
          <button type="submit" onClick={handleCheckout} disabled={loading}>
            {loading ? 'Checking Product...' : 'Checkout'}
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CartList;
