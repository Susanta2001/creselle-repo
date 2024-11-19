import React, { useContext, useEffect } from 'react';
import { ProductContext } from '../context/ProductContext';

const Store = () => {
    const { allProducts, getProducts } = useContext(ProductContext);

    useEffect(() => {
        // Fetch products when the component mounts
        getProducts();
    }, [getProducts]);  

    // Check if `allProducts` is an array and contains products
    if (!Array.isArray(allProducts)) {
        return <p>Failed to load products.</p>;  // Fallback message if data is not in the expected format
    }

    return (
        <div className="store-page">
            <h1>Store Products</h1>
            <div className="products">
                {/* Show a message if no products are found */}
                {allProducts.length === 0 ? (
                    <p>No products available</p>
                ) : (
                    // Map through allProducts if it's a valid array
                    allProducts.map((product) => (
                        <div key={product._id} className="product-card">
                            <h3>{product.title}</h3>
                            <p>{product.description}</p>
                            <p>Price: ${product.price}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Store;
