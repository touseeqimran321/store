import React, { useState } from 'react';
import axios from 'axios';
import "./Checkoutform.css"; // Corrected file name

import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ setCheckoutCompleted }) => {
  const [loading, setLoading] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({});
  const [paymentInfo, setPaymentInfo] = useState({});
  const navigate = useNavigate();

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
      
      // Simulate a delay of 2 seconds for demonstration
      await new Promise(resolve => setTimeout(resolve, 2000));
      const userId = 5; // Replace with the actual user ID or get it from the user's authentication

      const orderData = {
        userId: userId,
        shippingInfo: shippingInfo,
        paymentInfo: paymentInfo,
      };

      const response = await axios.post('https://0ec3-2400-adc5-453-1500-907c-6c3d-f922-3664.ngrok-free.app/api/order/checkout', orderData);

      if (response.status === 201) {
        // setCheckoutCompleted(true);
        // Show alert message
        alert('Order placed successfully!');
        navigate('/SucessFull');
      } else {
        console.error('Checkout failed:', response.data.error);
        // Show alert message for failure
        alert('Checkout failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      // Show alert message for error
      alert('An error occurred during checkout. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container"> {/* Added container class */}
      {loading && (
        <div className="overlay">
          <div className="loader"></div>
        </div>
      )}
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
      <button type="button" className='btn-4' onClick={handleSubmitOrder} disabled={loading}>
        {loading ? 'Processing...' : 'Checkout'}
      </button>
    </div>
  );
};

export default CheckoutForm;
