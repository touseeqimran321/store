import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import './ProductDetails.css';
import { useNavigate } from 'react-router-dom';

export default function ProductDetails() {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1); // State for quantity
  const navigate = useNavigate();
const {user} =useAuth();
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://a714-2400-adc5-453-1500-60e3-4d57-bdbb-a819.ngrok-free.app/api/products/${id}`, {
          headers: {
            'ngrok-skip-browser-warning': 'avoid',
          }
        });
        setProductData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const addToCart = async () => {
    if (!productData) return; // Ensure productData is not null

    setLoading(true); // Set loading to true before making the API call

    const productId = productData.id;
    // alert(`Adding ${quantity} product(s) to cart`);
    try {
      const response = await axios.post(
        'https://a714-2400-adc5-453-1500-60e3-4d57-bdbb-a819.ngrok-free.app/api/cart/add',
        
        {userId:user.id,
           items: [{ productId, quantity }] },
        { headers: { 'ngrok-skip-browser-warning': 'avoid' } }
      );
      console.log('Product added to cart:', response.data);
      // alert('Product added to cart successfully');
      navigate('/cart');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart');
    } finally {
      setLoading(false); // Set loading back to false after the API call is completed
    }
  };

  const handleQuantityChange = (e) => {
    const { value } = e.target;
    setQuantity(parseInt(value)); // Parse value to an integer
  };

  return (
    <div>
      {isLoading && (
        <div className="overlay">
          <div className="loader"></div>
        </div>
      )}
      {productData && (
        <div className="product-details-container">
          <div className="product-image-container">
            <img
              className="product-image-2"
              src={`https://a714-2400-adc5-453-1500-60e3-4d57-bdbb-a819.ngrok-free.app${productData.productImage}`}
              alt={`${productData.productName} - Product Image`}
            />
          </div>
          <div className="product-info-container">
            <h3 className="product-name">{productData.productName}</h3>
            <p className="product-description">{productData.productDescription}</p>
            <p className="product-price"><strong>Price: </strong>${productData.productPrice}</p>
            <p className="product-stock"><strong>Stock:</strong> {productData.quantityInstock}</p>
            <div className="quantity-container">
              <label className="quantity-label" htmlFor="quantity">Quantity:</label>
              <input
                className="quantity-input"
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
              />
            </div>
            <button className="add-to-cart-btn" onClick={addToCart} disabled={isLoading}>
              {isLoading ? 'Adding to Cart...' : 'Add to Cart'}
            </button>
          </div>
          <button className="close-details-btn" onClick={() => navigate('/List')} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Close Details'}
          </button>
        </div>
      )}
    </div>
  );
}
