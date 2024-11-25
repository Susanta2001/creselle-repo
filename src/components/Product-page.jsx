import React, { useState, useContext } from 'react';
import { ProductContext } from '../context/ProductContext';

const ProductPage = () => {
    const { allProducts, addProduct } = useContext(ProductContext); // Use allProducts here
    const [productData, setProductData] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
        image: null, // Add image state
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setProductData({ ...productData, image: e.target.files[0] }); // Store selected file
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate product data here before submitting (or rely on API validation)
        await addProduct(productData);
        setProductData({ title: '', description: '', price: '', category: '', image: null }); // Reset form after submit
    };

    return (
        <div>
            <h1>Product Page</h1>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                <input
                    type="text"
                    name="category"
                    value={productData.category}
                    onChange={handleChange}
                    placeholder="Category"
                />
                <input
                    type="file"
                    name="image"
                    onChange={handleFileChange} // Capture file input
                    accept="image/*"
                />
                <button type="submit">Add Product</button>
            </form>

            <h2>Products</h2>
            <ul>
                {allProducts.map((product) => (
                    <li key={product._id}>
                        <h3>{product.title}</h3>
                        <p>{product.description}</p>
                        <p>INR{product.price}</p>
                        <p>Category: {product.category}</p>
                        {product.image && <img src={`http://localhost:5000/${product.image}`} alt={product.title} width="100" />}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductPage;
