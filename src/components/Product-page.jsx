import React, { useState, useContext } from 'react';
import { ProductContext } from '../context/ProductContext';

const ProductPage = () => {
    const { allProducts, addProduct } = useContext(ProductContext); // Use allProducts here
    const [productData, setProductData] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
        images: [], // Change image state to handle multiple files
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setProductData({ ...productData, images: Array.from(e.target.files) }); // Store multiple files as an array
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate product data here before submitting (or rely on API validation)
        await addProduct(productData);
        setProductData({ title: '', description: '', price: '', category: '', image: [] }); // Reset form after submit
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
                    onChange={handleFileChange} // Capture multiple files
                    accept="image/*"
                    multiple // Allow multiple image selection
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
                        {product.images && product.images.map((img, index) => (
                            <img
                                key={index}
                                src={`http://localhost:5000/${img}`}
                                alt={`${product.title} ${index + 1}`}
                                width="100"
                            />
                        ))}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductPage;
