import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductList.css';
import { Link, useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('https://05bc-2400-adc5-453-1500-7d00-d26c-a7b3-29a9.ngrok-free.app/api/products', {
          headers: {
            'ngrok-skip-browser-warning': 'avoid',
          },
        });

        console.log('API Response:', response.data);

        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error('API did not return an array:', response.data);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const addToCart = async (product) => {
    const productId = product.id; // Assuming product.id exists
    const quantity = 1; // Default quantity is 1
    alert('Adding product to cart'); // Show alert when "Add to Cart" button is clicked
    setIsLoading(true);
    try {
      const response = await axios.post(
        'https://05bc-2400-adc5-453-1500-7d00-d26c-a7b3-29a9.ngrok-free.app/api/cart/add',
        {
          items: [{ productId, quantity }],
        },
        {
          headers: {
            'ngrok-skip-browser-warning': 'avoid',
          },
        }
      );
      console.log('Product added to cart:', response.data);
      alert('Product added to cart successfully'); // Show alert when product is added to cart successfully
      navigate('/cart');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart'); // Show alert when there's an error adding the product to cart
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="product-list-container">
      <h2>Product List</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <ul className="product-list">
          {products.map((product) => (
            <li key={product.id} className="product-item">
              <div>
              <Link to={`/product/${product.id}`}>
                <img
                  className="product-image-1"
                  src={`https://05bc-2400-adc5-453-1500-7d00-d26c-a7b3-29a9.ngrok-free.app${product.productImage}`}
                  alt={`${product.productName} - Product Image`}
                />
              </Link>
              </div>
              <h3 className='name'>{product.productName}</h3>
              <p className='desc'>Description: {product.productDescription}</p>
              <p className='price'>Price: ${product.productPrice.toFixed(2)}</p>
              <div>
                {/* Pass a function reference to onClick */}
                <button className="btn" onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default ProductList;