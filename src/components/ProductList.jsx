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
        const response = await axios.get('https://33b5-2400-adc5-453-1500-20b2-db3e-92c6-6d1f.ngrok-free.app/api/products', {
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
    setIsLoading(true);
    try {
      const response = await axios.post(
        'https://33b5-2400-adc5-453-1500-20b2-db3e-92c6-6d1f.ngrok-free.app/api/cart/add',
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
      // Navigate to cart page
      navigate('/cart');
      // Prepend the new product to the products list
      setProducts([product, ...products]);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };
    
  const handleLinkClick = () => {
    setIsLoading(true);
  };

  return (
    <div className="product-list-container">
      {isLoading && (
        <div className="overlay">
          <div className="loader"></div>
        </div>
      )}
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
              <Link to={`/product/${product.id}`} onClick={handleLinkClick} >
  {isLoading && (
        <div className="overlay">
          <div className="loader"></div>
        </div>
      )}
  <img
    className="product-image-1"
    src={`https://33b5-2400-adc5-453-1500-20b2-db3e-92c6-6d1f.ngrok-free.app${product.productImage}`}
    alt={`${product.productName} - Product Image`}
  />
</Link>

              </div>
              <h3 className='name'>{product.productName}</h3>
              <p className='desc'>Description: {product.productDescription}</p>
              <p className='price'>Price: ${product.productPrice.toFixed(2)}</p>
              {product.quantityInstock > 0 ? (
                <div>
                  <button className="btn" onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
              ) : (
                <p className="sold-out">Out of Stock</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
