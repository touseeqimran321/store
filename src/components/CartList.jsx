import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./CartList.css";

const CartList = () => {
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState({ id: null, items: [] });
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({});
  const [paymentInfo, setPaymentInfo] = useState({});
  const [checkoutClicked, setCheckoutClicked] = useState(false);
  const [checkoutCompleted, setCheckoutCompleted] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userId = 5; // Replace with the actual user ID or get it from the user's authentication

        const response = await axios.get(`https://968a-2400-adc5-453-1500-f8f4-fe31-4c5a-1750.ngrok-free.app/api/cart/get?userId=${userId}`, {
          headers: { 'ngrok-skip-browser-warning': 'avoid' }
        });

        if (response.status === 200) {
          setCart({ id: response.data.cartId, items: response.data.cartItems });
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

  const handleCheckout = () => {
    setCheckoutClicked(true);
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  const handleSubmitOrder = async () => {
    try {
      setLoading(true);
      const userId = 5; // Replace with the actual user ID or get it from the user's authentication

      const orderData = {
        userId: userId,
        cartId: cart.id,
        shippingInfo: shippingInfo,
        paymentInfo: paymentInfo,
      };

      const response = await axios.post('https://968a-2400-adc5-453-1500-f8f4-fe31-4c5a-1750.ngrok-free.app/api/order/checkout', orderData);

      if (response.status === 201) {
        setCheckoutCompleted(true);
        setCheckoutClicked(false); // Reset checkout state
        // Optionally, you can clear the cart or redirect to a success page here
      } else {
        console.error('Checkout failed:', response.data.error);
        // Handle checkout failure
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      // Handle error during checkout
    } finally {
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
                <img src={`https://968a-2400-adc5-453-1500-f8f4-fe31-4c5a-1750.ngrok-free.app${item.Product.productImage}`} alt={item.Product.productName} className="product-image" />
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
            <button type="button" onClick={handleCheckout} disabled={loading}>
              {loading ? 'Conforming Product...' : 'Conform order'}
            </button>
          )}
          {checkoutClicked && !checkoutCompleted && (
            <div className="checkout-info">
              <h2>Shipping Information</h2>
              <form>
                <input type="text" name="name" placeholder="Name" onChange={handleShippingChange} required />
                <input type="text" name="address" placeholder="Address" onChange={handleShippingChange} required />
                <input type="text" name="phone" placeholder="Phone" onChange={handleShippingChange} required />
              </form>
              <h2>Payment Information</h2>
              <form>
                <input type="text" name="cardNumber" placeholder="Card Number" onChange={handlePaymentChange} required />
                <input type="text" name="expirationDate" placeholder="Expiration Date" onChange={handlePaymentChange} required />
                <input type="text" name="cvv" placeholder="CVV" onChange={handlePaymentChange} required />
              </form>
              <button type="button" onClick={handleSubmitOrder} disabled={loading}>
                {loading ? 'Processing...' : 'Checkout'}
              </button>
            </div>
          )}
          {checkoutCompleted && (
            <div className="checkout-completed">
              <h2>Order Placed Successfully!</h2>
              {/* Optionally display order summary or redirect to a success page */}
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CartList;
