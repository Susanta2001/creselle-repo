import React, { useState, useContext } from 'react';
import { ProductContext } from '../context/ProductContext';

const ProductPage = () => {
  const { allProducts, addProduct } = useContext(ProductContext); // Use allProducts here
  const [productData, setProductData] = useState({
    title: '',
    description: '',
    price: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate product data here before submitting (or rely on API validation)
    addProduct(productData);
    setProductData({ title: '', description: '', price: '' }); // Reset form after submit
  };

  return (
    <div>
      <h1>Product Page</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={productData.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <input
          type="text"
          name="description"
          value={productData.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <input
          type="number"
          name="price"
          value={productData.price}
          onChange={handleChange}
          placeholder="Price"
        />
        <button type="submit">Add Product</button>
      </form>

      <h2>Products</h2>
      <ul>
        {allProducts.map((product) => (  // Use allProducts here
          <li key={product._id}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductPage;
