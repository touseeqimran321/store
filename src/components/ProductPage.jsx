import React, { useState } from 'react';
import axios from 'axios';
import './productpage.css';

const AddProduct = () => {
  const [product, setProduct] = useState({
    productName: '',
    productDescription: '',
    productPrice: '',
    productImage: '',
    quantityInstock: '' // Use null instead of an empty string for the file
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState(null); // Add this line to initialize the alert state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (
      product.productName.trim() === '' ||
      product.productDescription.trim() === '' ||
      product.productPrice.trim() === '' ||
      product.quantityInstock.trim() === '' ||
      !product.productImage
    ){
      showAlert('error', 'Please fill in all fields before adding the product.');
      window.alert('Please fill in all fields before adding the product.'); // Add this line to show JavaScript alert
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('productName', product.productName);
      formData.append('productDescription', product.productDescription);
      formData.append('productPrice', product.productPrice);
      formData.append('productImage', product.productImage);
      formData.append('quantityInstock', product.quantityInstock);

      // Send the new product with the file to the server
      await axios.post('https://05bc-2400-adc5-453-1500-7d00-d26c-a7b3-29a9.ngrok-free.app/api/products', formData);
      
      showAlert('success', 'Product added successfully!');
      setProduct({
        productName: '',
        productDescription: '',
        productPrice: '',
        productImage: '',
        quantityInstock: ''
      });
    } catch (error) {
      console.error('Error adding product:', error);
      showAlert('error', 'Error adding product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add Product</h2>
      {isSubmitting ? (
        <div className="loader">Loading...</div>
      ) : (
      <form onSubmit={handleAddProduct} encType="multipart/form-data">
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
            onChange={(e) => setProduct({ ...product, productImage: e.target.files[0] })}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Adding Product...' : 'Add Product'}
          </button>
        </div>
      </form>
      )}
      {alert && (
        <div className={`alert ${alert.type}`}>
          <p>{alert.message}</p>
        </div>
      )}
    </div>
  );
}

export default AddProduct;
