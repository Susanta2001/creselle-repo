import React, { createContext, useState } from 'react';

// Create a context for products
const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    // State for storing all products
    const [allProducts, setAllProducts] = useState([]);

    // Function to add a product
    const addProduct = async (productData) => {
        try {
            const response = await fetch('http://localhost:5000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });
            
            if (!response.ok) {
                throw new Error('Failed to save product');
            }

            const data = await response.json();
            setAllProducts((prevProducts) => [...prevProducts, data.product]); // Add new product to state

        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    // Function to fetch all products
    const getProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/products/allProducts', {
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const json = await response.json();
            setAllProducts(json.products);  // Update state with the fetched products
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchProductsByCategory = async (category) => {
        try {
            const response = await fetch(`http://localhost:5000/api/products/category/${category}`);
            if (!response.ok) {
                throw new Error('Failed to fetch products by category');
            }
            const data = await response.json();
            return data.products; // Return the category-specific products
        } catch (error) {
            console.error('Failed to fetch products by category:', error);
            return []; // Return an empty array in case of an error
        }
    };
    

    

    return (
        <ProductContext.Provider value={{ allProducts, addProduct, getProducts, fetchProductsByCategory }}>
            {children}
        </ProductContext.Provider>
    );
};

export { ProductContext, ProductProvider };
