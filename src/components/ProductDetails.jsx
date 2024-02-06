import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetails.css';
import { Link, useNavigate } from 'react-router-dom';



export default function ProductDetails({ closeDetails }) {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://05bc-2400-adc5-453-1500-7d00-d26c-a7b3-29a9.ngrok-free.app/api/products/${id}`, {
          headers: {
            'ngrok-skip-browser-warning': 'avoid',
          }
        });
        setProductData(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const addToCart = async () => {
    if (!productData) return; // Ensure productData is not null

    const productId = productData.id;
    const quantity = 1;
    alert('Adding product to cart');
    try {
      const response = await axios.post(
        'https://05bc-2400-adc5-453-1500-7d00-d26c-a7b3-29a9.ngrok-free.app/api/cart/add',
        { items: [{ productId, quantity }] },
        { headers: { 'ngrok-skip-browser-warning': 'avoid' } }
      );
      console.log('Product added to cart:', response.data);
      alert('Product added to cart successfully');
      navigate('/cart');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart');
     

    }
  };
 
  return (
    <div>
      {productData && (
        <div className="product-details-container">
          <h3>Product Details</h3>
         
          <img
            className="product-image"
            src={`https://05bc-2400-adc5-453-1500-7d00-d26c-a7b3-29a9.ngrok-free.app${productData.productImage}`}
            alt={`${productData.productName} - Product Image`}
          />
          <p><strong>Name:</strong> {productData.productName}</p>
          <p><strong>Description:</strong> {productData.productDescription}</p>
          <p><strong>Price:</strong> ${productData.productPrice}</p>
          <p><strong>Stock:</strong> {productData.quantityInstock}</p>

          <button className="btn" onClick={addToCart}>
            Add to Cart
          </button>

          <button onClick={closeDetails} >Close Details</button>
        </div>
      )}
    </div>
  );
}
