import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker styles
import "./Checkoutform.css"; // Corrected file name
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({  cartId }) => { // Receive cartId as a prop
  const [loading, setLoading] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({});
  const [paymentInfo, setPaymentInfo] = useState({ expirationDate: null }); // Initialize expirationDate as null
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handlePaymentChange = (name, value) => {
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const userId = user.id;
      const response = await axios.post('https://a714-2400-adc5-453-1500-60e3-4d57-bdbb-a819.ngrok-free.app/api/order/checkout', {
         userId,
        shippingInfo,
        paymentInfo
      });

      if (response.status === 201) {
        console.log('Order placed successfully:', response.data);
        navigate('/SucessFull');
      } else {
        console.error('Checkout failed:', response.data.error);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {loading && (
        <div className="overlay">
          <div className="loader"></div>
        </div>
      )}
      <h2>Shipping Information</h2>
      <form>
        <input type="text" name="name" placeholder="Name" onChange={handleShippingChange} required />
        <input type="text" name="address" placeholder="Address" onChange={handleShippingChange} required />
        <input type="number" name="phone" placeholder="Phone" onChange={handleShippingChange} required />
      </form>
      <h2>Payment Information</h2>
      <form>
        <input type="text" className="expire" name="cardNumber" placeholder="Card Number" onChange={(e) => handlePaymentChange(e.target.name, e.target.value)} required />
        {/* Use DatePicker for expiration date */}
        <DatePicker 
          selected={paymentInfo.expirationDate} 
          onChange={(date) => handlePaymentChange("expirationDate", date)} 
          dateFormat="DD/MM/yyyy"
          showDateMonthYearPicker
          placeholderText="Expiration Date"
          required 
        />
        <input type="password" name="cvv" placeholder="CVV" onChange={(e) => handlePaymentChange(e.target.name, e.target.value)} required />
      </form>
      <button type="button" className='btn-4' onClick={handleCheckout} disabled={loading}>
        {loading ? 'Processing...' : 'Checkout'}
      </button>
    </div>
  );
};

export default CheckoutForm;
