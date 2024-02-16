import React, { useState } from 'react';
import axios from 'axios';
import './productpage.css';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [product, setProduct] = useState({
    productName: '',
    productDescription: '',
    productPrice: '',
    productImage: null,
    quantityInstock: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0]; // Get the first file selected
    setProduct({
      ...product,
      productImage: imageFile, // Store the file object
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('productName', product.productName);
      formData.append('productDescription', product.productDescription);
      formData.append('productPrice', product.productPrice);
      formData.append('productImage', product.productImage);
      formData.append('quantityInstock', product.quantityInstock);

      await axios.post('https://6089-2400-adc5-453-1500-20b2-db3e-92c6-6d1f.ngrok-free.app/api/products', formData);

      setLoading(false);
      navigate('/List');

      setAlert('Product added successfully');
      setProduct({
        productName: '',
        productDescription: '',
        productPrice: '',
        productImage: null,
        quantityInstock: ''
      });
    } catch (error) {
      console.error('Error adding product:', error);
      setLoading(false);
      setAlert('Error adding product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-product-container">
      {loading && (
        <div className="overlay">
          <div className="loader"></div>
        </div>
      )}
      <h2>Add Product</h2>
      <form onSubmit={handleAddProduct} encType="multipart/form-data">
        {/* {alert && <div className={`alert ${alert.startsWith('Error') ? 'error' : 'success'}`}>{alert}</div>} */}
        <div className="form-group">
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={product.productName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productDescription">Product Description:</label>
          <textarea
            id="productDescription"
            name="productDescription"
            rows="4"
            value={product.productDescription}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="productPrice">Product Price:</label>
          <input
            type="number"
            id="productPrice"
            name="productPrice"
            step="0.01"
            value={product.productPrice}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantityInstock">Product Quantity:</label>
          <input
            type="number"
            id="quantityInstock"
            name="quantityInstock"
            step="0.01"
            value={product.quantityInstock}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productImage">Product Image:</label>
          <input
            type="file"
            id="productImage"
            name="productImage"
            onChange={handleImageChange}
            // value={product.productImage}
            accept="image/*"
            required
          />
          {/* {product.productImage && (
            <img
              src={product.productImage}
              alt="Product Preview"
              style={{ maxWidth: '200px', marginTop: '10px' }}
            />
          )} */}
        </div>
        <div className="form-group">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Adding Product...' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
