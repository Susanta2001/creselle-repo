import React, { useEffect, useState } from 'react';
import '../assets/css/ProductTemplate.css'
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';

function ProductTemplate() {
    const { id } = useParams(); // Get product ID from URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Fetch current product
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/products/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const data = await response.json();
                setProduct(data.product);

                // Fetch related products
                fetchRelatedProducts(data.product.category);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchRelatedProducts = async (category) => {
            try {
                const response = await fetch(`http://localhost:5000/api/products/category/${category}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch related products');
                }
                const data = await response.json();
                setRelatedProducts(data.products.filter((item) => item._id !== id)); // Exclude the current product
            } catch (error) {
                console.error('Error fetching related products:', error);
            }
        };

        fetchProduct();
    }, [id]);


    if (loading) {
        return <p>Loading...</p>;
    }

    if (!product) {
        return <p>Product not found!</p>;
    }

    // function to handle add to cart function
    const handleAddToCart = async () => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    
        if (!token) {
            // Redirect to login with current location
            navigate('/login', { state: { from: location } });
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:5000/api/cart/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token,
                },
                body: JSON.stringify({ productId: id, quantity: 1 }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to add product to cart');
            }
            
            // Show success feedback (e.g., a toast or modal)
            alert('Product added to cart!');
            navigate('/addToCart');
        } catch (error) {
            console.error("Error adding product to cart", error);
            // Show error feedback
            alert('Failed to add product to cart');
        }
    };
    

    return (
        <>
            {/* dip's code starts from here */}
            {/* main div starts from here */}
            <div className='product-div d-flex p-4 mt-5'>
                {/* left div beginning*/}
                <div className='left-main d-flex'>
                    <div className='left-main-inner-one d-flex flex-column'>
                    {product.images.slice(1, 4).map((img, index) => (
                            <img
                                key={index}
                                src={`http://localhost:5000/${img}`}
                                alt={`Product ${index + 1}`}
                                style={{ width: '168px', height: '157px' }}
                            />
                        ))}
                    </div>
                    <div className='left-main-inner-two'>
                        <img src={`http://localhost:5000/${product.mainImage}`} alt='img -4' />
                    </div>
                </div>
                {/* right div beginning */}
                <div className='right-main d-flex flex-column justify-content-between'>
                    <h2>{product.title}</h2>
                    <div className='right-main-inner-one' style={{ marginLeft: '5%' }}>
                        <p>INR {product.price}</p>
                        <p>Inclusive of all taxes</p>
                    </div>
                    <div className='right-main-inner-two' style={{ marginLeft: '20%' }}>
                        <p><i className='bx bxs-offer mx-2'></i>Get this for INR 989
                            Flat 10% Off your first purchase. Download the app and use
                            Code: APP10</p>
                        <p><i className='bx bxs-offer mx-2'></i>Get this for INR 989
                            Flat 10% Off your first purchase. Download the app and use
                            Code: APP10</p>
                        <p><i className='bx bxs-offer mx-2'></i>Get this for INR 989
                            Flat 10% Off your first purchase. Download the app and use
                            Code: APP10</p>
                    </div>
                    <div className='right-main-inner-three d-flex justify-content-between  align-items-center'>
                        <div style={{ width: '30%' }} className=''><p>Select a size</p>
                            <div className='right-main-inner-three-one d-flex justify-content-between' style={{ width: '80%' }}>
                                <p>S</p>
                                <p>M</p>
                                <p>L</p>
                                <p>XL</p>
                            </div>
                        </div>
                        <div className='right-main-inner-three-two align-items-center' style={{ width: '30%' }}>
                            <p>Quanitity</p>
                            <div className='right-main-inner-three-three d-flex justify-content-between align-items-center' style={{ width: '50%' }}>
                                <p>-</p>
                                <p>0</p>
                                <p>+</p>
                            </div>
                        </div>
                        <div className='right-main-inner-three-four d-flex flex-column align-items-center' style={{ width: '30%' }}>
                            <p>Total</p>
                            <div>
                                INR 1,299
                            </div>
                        </div>
                    </div>
                    <div className='right-main-inner-four d-flex flex-column text-light'>
                        <button id='add-to-cart' className='text-light' style={{ backgroundColor: 'green', border: 'none', marginBottom: '2px' }} onClick={handleAddToCart}>
                            Add to cart
                        </button>
                        <button id='buy-now' className='text-light' style={{ backgroundColor: 'black', border: 'none' }}>
                            Buy Now
                        </button>
                    </div>
                </div>
                {/* half page completion */}
            </div>
            <div className='lower-main d-flex' style={{ gap: '15px' }}>
                {/* left div beginning */}
                <div className='lower-main-left justify-content-end d-flex flex-column' style={{ paddingLeft: '15%' }} >

                    <div className='lower-main-left-headers d-flex flex-column  mt-5' style={{ width: '100%' }}>
                        <div className='d-flex'>
                            <p style={{ border: '1px solid black', margin: '0px' }}>Returns</p>
                            <p style={{ margin: '0px', paddingLeft: '1%', paddingTop: '2px' }}>Our Promise</p>
                        </div>
                        <div>
                            <p style={{ border: '1px solid black', padding: '5%' }}>7 day Return and Exchange <a href="/" style={{ textDecoration: 'none' }}>click here.</a></p>
                        </div>
                    </div>
                    <div className='lower-main-left-bottom'>
                        <div className='lower-main-left-bottom-up mt-5'>
                            <div><p>Reviews and Ratings</p></div>
                            <div>
                                <i class='bx bxs-star'></i>
                                <i class='bx bxs-star'></i>
                                <i class='bx bxs-star'></i>
                                <i class='bx bxs-star'></i>
                                <i class='bx bxs-star'></i>
                                <button id='reviews'>
                                    <a href="/">(39 reviews)</a>
                                </button>  </div>
                        </div>
                        <div className='lower-main-left-bottom-down d-flex justify-content-between'>
                            <div className='lower-main-left-bottom-down-left'>
                                <h1>4.1</h1>
                                <p>420 Customers</p>
                            </div>
                            <div className='d-flex align-items-center flex-column'> <div className='lower-main-left-bottom-down-right'>
                                <i class='bx bxs-star'></i>
                                <i class='bx bxs-star'></i>
                                <i class='bx bxs-star'></i>
                                <i class='bx bxs-star'></i>
                                <i class='bx bxs-star'></i>
                            </div>
                                <button id='Write-R'>WRITE A REVIEW</button></div>
                        </div>
                    </div>
                </div>
                {/* right div beginning */}
                <div className='lower-main-right'>
                    <h5 style={{ marginTop: '10%' }}>Product Description</h5>
                    <p>{product.description}</p>
                    <h5>Product Details</h5>
                    <div className='d-flex justify-content-between'>
                        <div>
                            <p>Material Composition</p>
                            <p>Weave Type</p>
                            <p>Included Components</p>
                            <p>Product Manufacturer</p>
                        </div>
                        <div>
                            <p>Silk</p>
                            <p>Jacquard Type</p>
                            <p>With blouse piece</p>
                            <p>Leemboodi Fashion</p>
                        </div>
                    </div>
                </div>
            </div >
            {/* You May Also Like Section */}
            <div className='secondmain px-4' style={{ marginTop: '7rem' }}>
                <h1 className='mt-5'>You May Also Like</h1>
                <div className='secondmain-inner d-flex justify-content-between flex-wrap' style={{ width: 'max-content'}}>
                    {relatedProducts.length > 0 ? (
                        relatedProducts.map((relatedProduct) => (
                            <div className='innerCard d-flex flex-column justify-content-between mt-5' key={relatedProduct._id}>
                                <img
                                    src={`http://localhost:5000/${relatedProduct.mainImage}`}
                                    alt={relatedProduct.title}
                                    style={{ width: '200px', height: '200px'}}
                                />
                                <p>{relatedProduct.title}</p>
                                <div className="d-flex justify-content-between align-items-center" >
                                    <p className='m-0'>INR {relatedProduct.price}</p>
                                    <Link to={`/${relatedProduct._id}`} className="purchase-btn buy-now-btn text-decoration-none">Buy Now</Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No related products found.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default ProductTemplate;
