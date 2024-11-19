import '../assets/css/Store.css';
import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../context/ProductContext';
import logo from '../images/logo.png';
import Offcanvas from './Offcanvas';
import storeBanner from '../images/store-banner.jpg';

const Store = () => {
    const { allProducts, getProducts } = useContext(ProductContext);

    const [selectedCategory, setSelectedCategory] = useState('All'); // Track the selected category

    // Fetch products when the component mounts
    useEffect(() => {
        getProducts();
    }, [getProducts]);

    // Check if `allProducts` is an array and contains products
    if (!Array.isArray(allProducts)) {
        return <p>Failed to load products.</p>; // Fallback message if data is not in the expected format
    }

    // Get unique categories for filtering
    const categories = ['All', ...new Set(allProducts.map(product => product.category))];

    // Filter products based on the selected category
    const filteredProducts =
        selectedCategory === 'All'
            ? allProducts
            : allProducts.filter(product => product.category === selectedCategory);

    return (
        <>
            <div className="container-fluid p-4">
                {/* the banner is starting from here */}
                <div
                    className="banner-outer"
                    id="store-banner"
                    style={{
                        backgroundImage: `url(${storeBanner})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center'
                    }}
                >
                    <div className="logo-container d-flex align-items-center">
                        <button
                            className="btn off-canvas-btn"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#staticBackdrop"
                            aria-controls="staticBackdrop"
                        >
                            <i className="bx bx-menu text-light"></i>
                        </button>
                        <div
                            className="logo d-inline-block"
                            style={{ width: '200px', height: '100px' }}
                        >
                            <img
                                src={logo}
                                alt="Logo"
                                className="mt-1"
                                style={{ width: '100%', height: '100px', objectFit: '' }}
                            />
                        </div>
                    </div>

                    <div className="px-5 banner-inner d-flex" style={{ width: '100%' }}>
                        <div
                            className="inner-text d-flex flex-column align-self-end px-5"
                            style={{ width: '40%', marginLeft: 'auto' }}
                        >
                            <p className="store-head-text">
                                Get upto 40% discount on your first purchase
                            </p>
                            <button className="border purchase-btn p-2">Buy Now</button>
                        </div>
                    </div>
                </div>
                <Offcanvas />
                {/* DANGER - DO NOT TOUCH THESE TWO DIV */}
                <div className="design-card top-right-card position-absolute"></div>
                <div className="bottom-left-card position-absolute"></div>
                {/* banner ends here */}
            </div>
            {/* banner ends here */}

            {/* store page starts from here */}
            <div className="store-page" style={{ marginTop: '4rem' }}>

                {/* Category Buttons */}
                <div className="categories px-4 mb-4">
                    {categories.map(category => (
                        <button
                        key={category}
                            className={`btn me-2 ${
                                selectedCategory === category ? 'btn-primary' : 'btn-outline-primary'
                            }`}
                            onClick={() => setSelectedCategory(category)}
                            >
                            {category}
                        </button>
                    ))}
                </div>
                    <h1 className="px-4">Store Products</h1>

                <div className="products d-flex flex-wrap">
                    {/* Show a message if no products are found */}
                    {filteredProducts.length === 0 ? (
                        <p>No products available in this category.</p>
                    ) : (
                        // Map through filteredProducts if it's a valid array
                        filteredProducts.map(product => (
                            <div
                                key={product._id}
                                className="col-lg-4 col-md-3 col-sm-12"
                                style={{ margin: '4rem 0rem' }}
                            >
                                <div className="product-card card">
                                    <img
                                        src={product.image || ''}
                                        alt={product.title}
                                        className="rounded-0"
                                        style={{ backgroundColor: '#d9d9d9' }}
                                    />
                                    <div className="card-body">
                                        <h3>{product.title}</h3>
                                        <p>{product.description}</p>
                                        <div className="price-div d-flex justify-content-center align-items-center">
                                            <p>Price: ${product.price}</p>
                                            <button className="purchase-btn buy-now-btn">Buy Now</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default Store;
