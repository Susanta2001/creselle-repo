import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';
import '../../assets/css/Trending.css'

function Trending() {
    const { fetchProductsByCategory } = useContext(ProductContext); // Access only the required context function
    const [categoryProducts, setCategoryProducts] = useState(['Saree']); // Local state for category-specific products

    // Fetch and set products for a specific category
    const fetchCategoryProducts = async (category) => {
        try {
            const products = await fetchProductsByCategory(category); // Fetch category-specific products
            setCategoryProducts(products); // Update local state directly
        } catch (error) {
            console.error('Error fetching category products:', error);
        }
    };

    useEffect(() => {
        fetchCategoryProducts('Saree'); // Fetch 'Saree' products initially
    },);


    return (
        <div className="d-flex flex-column trending-area" style={{background: '#d9d9d9'}}>
            <h2>Trending</h2>
            <div className="options d-flex align-self-end">
                <p onClick={() => fetchCategoryProducts('Saree')}>Saree</p>
                <p onClick={() => fetchCategoryProducts('Kurta')}>Kurta</p>
                <p onClick={() => fetchCategoryProducts('Jeans')}>Jeans</p>
            </div>
            {categoryProducts.length > 0 ? (
                categoryProducts.map((element, index) => (
                    <div key={index} className='trending-product-card'>
                        <img src='' href="/" alt='product-image'/>
                        <p>{element.title}</p>
                        <p>{element.price}</p>
                    </div>
                ))
            ) : (
                <p>Nothing to show</p>
            )}
        </div>
    );
}

export default Trending;
