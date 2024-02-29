import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "./Checkoutform.css";
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ cartId }) => {
  const [loading, setLoading] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({});
  const [paymentInfo, setPaymentInfo] = useState({ expirationDate: null });
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
      const response = await axios.post('https://a8ff-111-88-233-53.ngrok-free.app/api/order/checkout', {
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
        <input 
          type="text" 
          className="expire" 
          name="Phone" 
          placeholder="Phone" 
          onKeyDown={(e) => {
            // Allow only numbers and spaces
            if (!/[0-9\s]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
              e.preventDefault();
            }
          }}
          onChange={(e) => handlePaymentChange(e.target.name, e.target.value)} 
          required 
        />
      </form>
      <h2>Payment Information</h2>
      <form>
      <input 
  type="text" 
  className="expire" 
  name="cardNumber" 
  placeholder="Card Number" 
  onKeyDown={(e) => {
    // Allow only numbers and handle space insertion
    if (!/[0-9\s]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
      e.preventDefault();
    }
  }}
  onChange={(e) => {
    const { value } = e.target;
    // Remove spaces from the input value
    const formattedValue = value.replace(/\s/g, '');
    // Format the input value with spaces every four characters
    const formattedWithSpaces = formattedValue.replace(/(\d{4})/g, '$1 ').trim();
    // Set the formatted value to the input field
    e.target.value = formattedWithSpaces;
    // Update the paymentInfo state without spaces
    handlePaymentChange(e.target.name, formattedValue);
  }} 
  required 
/>
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
