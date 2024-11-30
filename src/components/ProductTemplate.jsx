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
            <div className='tempmain container d-flex justify-content-around'>
                <div className='tempinner d-flex justify-content-around align-items-center'>
                    <div className='innerone d-flex flex-column'>
                        {product.images.slice(1, 4).map((img, index) => (
                            <img
                                key={index}
                                src={`http://localhost:5000/${img}`}
                                alt={`Product ${index + 1}`}
                                style={{ width: '168px', height: '157px' }}
                            />
                        ))} </div>
                    <div className='innertwo'>
                        <img src={`http://localhost:5000/${product.mainImage}`} alt="..." style={{ width: '487px', height: '537px' }} />
                    </div>
                </div>
                <div className='innerthree d-flex align-self-center flex-column'>
                    <h1>{product.title}</h1>
                    <p>INR {product.price}</p>
                    <p>Inclusive of all taxes</p>
                    {/* offer section starts from here */}
                    <div className='offers w-75'>
                        <div className='offer-one d-flex align-items-center'>
                            <i className='bx bxs-offer mx-2'></i><p>
                                Get this for INR 98
                                Flat 10% Off your first purchase. Download the app and use
                                Code: APP10
                            </p>
                        </div>
                        <div className='offer-one d-flex align-items-center'>
                            <i className='bx bxs-offer mx-2'></i><p>
                                Get this for INR 989
                                Flat 10% Off your first purchase. Download the app and use
                                Code: APP10
                            </p>
                        </div>
                        <div className='offer-one d-flex align-items-center'>
                            <i className='bx bxs-offer mx-2'></i><p>
                                Get this for INR 989
                                Flat 10% Off your first purchase. Download the app and use
                                Code: APP10
                            </p>
                        </div>
                    </div>
                    {/* offer section ends her */}

                    {/* product headers starts from here */}
                    <div className='main-product-headers d-flex justify-content-between'>
                        <div className='size-div'>
                            <p>Select a size</p>
                            <div className='sizes d-flex justify-content-between'>
                                <p>S</p>
                                <p>M</p>
                                <p>L</p>
                                <p>XL</p>
                            </div>
                        </div>
                        <div className='quanitity-div' >
                            <p>Quanitity</p>
                            <div className='quantity-div-inner d-flex justify-content-between align-items-center'>
                                <p>-</p>
                                <p>0</p>
                                <p>+</p>
                            </div>
                        </div>
                        <div className='total-div d-flex flex-column'>
                            <p>Total</p>
                            <div>
                                INR 1,299
                            </div>
                        </div>
                    </div>
                    {/* product headers end here */}
                    <div className='actionb mt-1'>
                        <button id='addtocart' className='mb-1' onClick={handleAddToCart}>
                            Add to Cart
                        </button>
                        <button id='buynow' className='mb-1'>
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
            <div className='reviews-main container w-100 d-flex justify-content-between flex column'>
                <div className='d-flex reviews-main-inner flex-column w-50'>
                    <div className='reviews-left w-100 d-flex flex-column'>
                        <div className='reviews-left-headers d-flex'>
                            <h6 className='f-lheader '>Returns</h6>
                            <h6 className='ps-3 pt-1'>Our Promise</h6>
                        </div>
                        <p className='ret-desc ps-2' style={{ border: '1px solid black' }}>7 day Return and Exchange <a href="/">click here.</a></p>
                    </div>
                    <div className='reviews-two'>
                        <h6>Reviews and Ratings</h6>
                        <i class='bx bxs-star'></i>
                        <i class='bx bxs-star'></i>
                        <i class='bx bxs-star'></i>
                        <i class='bx bxs-star'></i>
                        <i class='bx bxs-star'></i>
                        <button id='reviews'>
                            <a href="/">(39 reviews)</a>
                        </button>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <div className='l-one d-flex flex-column text-center'>
                            <h2>4.1</h2>
                            <p>420 customers</p>
                        </div>
                        <div className='r-one d-flex flex-column text-center'>
                            <div>
                                <i class='bx bxs-star'></i>
                                <i class='bx bxs-star'></i>
                                <i class='bx bxs-star'></i>
                                <i class='bx bxs-star'></i>
                                <i class='bx bxs-star'></i>
                            </div>
                            <button id='Write-R'>WRITE A REVIEW</button>
                        </div>
                    </div>
                </div>
                <div className='reviews-right w-50' style={{ marginLeft: '11rem' }}>
                    <div>
                        <h3>Product Description</h3>
                        <p>{product.description}</p>
                    </div>
                    <div className='pro-details'>
                        <div>
                            <h3>Product Details</h3>
                        </div>
                        <div className='pro-contents d-flex justify-content-between'>
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

                </div>
            </div>
            {/* half page completion */}
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
