import React, { useState, useEffect, useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';
import '../../assets/css/Trending.css';
import {Link} from 'react-router-dom'

function Trending() {
    const { fetchProductsByCategory } = useContext(ProductContext); // Access only the required context function
    const [categoryProducts, setCategoryProducts] = useState([]); // Local state for category-specific products

    // Fetch and set products for a specific category
    const fetchCategoryProducts = async (category) => {
        try {
            const products = await fetchProductsByCategory(category); // Fetch category-specific products
            setCategoryProducts(products); // Update local state directly
        } catch (error) {
            console.error('Error fetching category products:', error);
        }
    };

    // Fetch 'Saree' products initially when the component mounts
    useEffect(() => {
        fetchCategoryProducts('Saree');
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    return (
        <div className="d-flex flex-column trending-area p-4" style={{ background: '#d9d9d9', height:'auto' }}>
            <h2 className="trending-title">Trending</h2>
            <div className="options d-flex align-self-end">
                <p className="mx-3" onClick={() => fetchCategoryProducts('Saree')}>
                    Saree
                </p>
                <p className="mx-3" onClick={() => fetchCategoryProducts('Kurta')}>
                    Kurta
                </p>
                <p className="mx-3" onClick={() => fetchCategoryProducts('Jeans')}>
                    Jeans
                </p>
            </div>
            <div className="d-flex pb-5">
                {categoryProducts.length > 0 ? (
                    categoryProducts
                        .slice()
                        .reverse() // Reverse to prioritize latest products
                        .slice(0, 3) // Take the first 3 after reversing
                        .map((element, index) => (
                            <div key={index} className="trending-product-card p-2">
                                <img src={`http://localhost:5000/${element.images[0]}`} alt="product" />
                                <p className="p-title">{element.title}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                <p className="p-price m-0">INR {element.price}</p>
                                <Link to={`/${element._id}`} className='text-decoration-none buy-now-btn purchase-btn'>Buy Now</Link>
                                </div>
                            </div>
                        ))
                ) : (
                    <p>Nothing to show</p>
                )}
            </div>
        </div>
    );
}

export default Trending;
