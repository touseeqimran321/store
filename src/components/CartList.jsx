import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./CartList.css";
import  {useAuth} from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const CartList = () => {
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState({ id: null, items: [] });
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkoutClicked, setCheckoutClicked] = useState(false);
  // const [userId, setUserId] = useState('')
  const [checkoutCompleted, setCheckoutCompleted] = useState(false);
  const navigate = useNavigate();
   const {user} = useAuth()

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userId = user.id; // Replace with the actual user ID or get it from the user's authentication

        const response = await axios.get(`https://a714-2400-adc5-453-1500-60e3-4d57-bdbb-a819.ngrok-free.app/api/cart/get?userId=${userId}`, {
          headers: { 'ngrok-skip-browser-warning': 'avoid' }
        });

        if (response.status === 200) {
          setCart({id: response.data.cartId,  items: response.data.cartItems });
          console.log(response.data)
          calculateTotalPrice(response.data.cartItems);
          
        } else {
          console.error('Error fetching cart items:', response.data.error);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCartItems();
  }, []);

  const calculateTotalPrice = (items) => {
    let total = 0;
    items.forEach((item) => {
      total += item.Product.productPrice * item.quantity;
    });
    setTotalPrice(total);
  };

  const handleCheckout = async () => {
    try {
      setLoading(true);
      navigate('/Checkoutform')
      // Simulating a delay of 2 seconds for demonstration
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLoading(false);
      setCheckoutClicked(true);
    } catch (error) {
      console.error('Error during checkout:', error);
      setLoading(false);
    }
  };
  
  return (
    <div className="cart-container">
      {loading && (
        <div className="overlay">
          <div className="loader"></div>
        </div>
      )}
      <h2 className="cart-title">Shopping Cart</h2>
      {cart.items.length > 0 ? (
        <div>
          <ul className="cart-items">
            {cart.items.map((item) => (
              <li key={item.id} className={`cart-item ${item.status === 'Completed' ? 'completed' : ''}`}>
                <img src={`https://a714-2400-adc5-453-1500-60e3-4d57-bdbb-a819.ngrok-free.app${item.Product.productImage}`} alt={item.Product.productName} className="product-image" />
                <div className="product-details">
                  <p className="product-name">{item.Product.productName}</p>
                  <p className="product-price">Price: ${item.Product.productPrice}</p>
                  <p className="quantity">Quantity: {item.quantity}</p>
                  <p className="status">Status: {item.status}</p>
                </div>
              </li>
            ))}
          </ul>
          <p>Total Price: ${totalPrice}</p>
          {!checkoutClicked && (
           <button type="button" onClick={handleCheckout} disabled={loading || checkoutClicked || cart.items.some(item => item.status === 'Completed')}>
           {loading ? 'Confirming Product...' : 'Confirm order'}
         </button>
         
          )}
        </div>
      ) : (
        <p>No Cart Items In The Cart</p>
      )}
    </div>
  );
};

export default CartList;
