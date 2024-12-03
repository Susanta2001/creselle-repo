import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/CartContext';
import '../assets/css/AddToCart.css'
function Cart() {

    const {allCartProducts, getCartProducts,updateProductQuantity, removeProductFromCart} = useContext(CartContext);

    // use effect to run the getCartProducts function right after the page loads
    useEffect(() => {
        getCartProducts();
    }, []);


    // function to handle quantity increment and decrement
    const handleIncrement = (productId, currentQuantity) => {
        updateProductQuantity(productId, currentQuantity + 1);
    }
    const handleDecrement = (productId, currentQuantity) => {
        if (currentQuantity > 1) {
            updateProductQuantity(productId, currentQuantity - 1);
        } else {
            removeProductFromCart(productId); // Remove if quantity becomes 0
        }
    }

    const handleDelete = (productId) => {
        removeProductFromCart(productId);
    };

    // Calculate the order total
    const calculateOrderTotal = () => {
        return allCartProducts.reduce((total, item) => {
            return total + item.product.price * item.quantity;
        }, 0);
    };
    return (
        <>
            <div>
                <h2>YOUR CART</h2>
            </div>
            <div className='p-4'>
                <div className='prod-headers d-flex align-items-center justify-content-between' style={{ backgroundColor: '#C7B8B8' }}>
                    <p className='prod'>PRODUCT</p>
                    <p className='pri'>PRICE</p>
                    <p className='quan'>QUANTITY</p>
                    <p className='subt'>SUBTOTAL</p>
                </div>
                <div className='prod-main py-3' style={{ backgroundColor: '#d9d9d9' }}>
                    {allCartProducts.map((item, index) => (

                    
                    <div className='prod-main-inner d-flex p-2' key={item._id}  style={{ borderBottom: '1px solid black' }}>
                        {/* this is for the first div */}
                        <div className='prod-inner-div d-flex justify-content-center align-items-center' id='prod-div-inner-one' style={{ width: '40%', borderRight: '1px solid black' }}>
                            <img src={`http://localhost:5000/${item.product.mainImage}`} alt="..." />

                            <p id='prod-title' className='mx-2' style={{maxWidth: '8%'}}>{item.product.title}</p>
                        </div>
                        {/* this is for the second div */}
                        <div className='prod-inner-div d-flex justify-content-center align-items-center' id='prod-div-inner-two' style={{ width: '20%', borderRight: '1px solid black' }}>
                            <p id='prod-price'>{item.product.price}</p>
                        </div>
                        {/* this is for the third div */}
                        <div className='prod-inner-div d-flex justify-content-center align-items-center' id='prod-div-inner-three' style={{ borderRight: '1px solid black' }}>
                            <i className='bx bxs-trash' onClick={() => handleDelete(item.product._id)}></i>
                            <div className='item-quantity d-flex justify-content-between'>
                                <p onClick={() => handleDecrement(item.product._id, item.quantity)}>-</p>
                                <p>{item.quantity}</p>
                                <p onClick={() => handleIncrement(item.product._id, item.quantity)}>+</p>
                            </div>
                        </div>
                        {/* this is for the fourth div */}
                        <div className='prod-inner-div d-flex justify-content-center align-items-center' id='prod-div-inner-four' style={{ width: '20%'}}>
                            <p id='price-total' style={{ margin: 'auto' }}>{item.product.price * item.quantity}</p>
                        </div>
                    </div>
                    ))}
                </div>
                {/* this is for price details */}
                <h5 style={{ display: 'block', color: '#295719', backgroundColor: '#d9d9d9',margin:'0',paddingBottom:'25px',paddingLeft:'15px'}}>Price Details:</h5>
                <div className='item-total-inner d-flex' style={{ backgroundColor: '#d9d9d9' }}>
                    
                    <div className='item-total-left' style={{ width: '60%' }}>
                        <p style={{paddingLeft:'15px',borderBottom:'1px solid black'}}>Delivery Charges:</p>
                        <h4 style={{paddingLeft:'15px'}}>Order Total :</h4>
                    </div>
                    <div className='item-total-mid' style={{ width: '20%', borderRight: '1px solid black' }}>
                        <p style={{ color: '#295719',borderBottom:'1px solid black' }}>FREE DELIVERY</p>
                        <p style={{ color: '#295719'}}>{calculateOrderTotal()}</p>
                    </div>
                    <div className='item-total-right d-flex justify-content-center align-items-end' style={{ width: '20%'}}>
                        <button id='checkout' style={{height:'51px'}}>
                            <a href="/">Proceed to buy</a>
                        </button>
                    </div>
                </div>
                {/* above header section starts from here */}
                <div className='secondmain px-4' style={{ marginTop: '10rem' }}>
                    <h2>Continue Shopping For</h2>
                    <div className='secondmain-inner d-flex justify-content-between'>
                        <div className='innerCard'>
                            <img src='' alt='/'></img>
                            <p>
                                Cotton Saree at minimal cost than you can even imagine.
                            </p>
                            <p>
                                INR 2,999
                            </p>
                        </div>
                        <div className='innerCard'>
                            <img src='' href alt='/'></img>
                            <p>
                                Cotton Saree at minimal cost than you can even imagine.
                            </p>
                            <p>
                                INR 2,999
                            </p>
                        </div>
                        <div className='innerCard'>
                            <img src='' href alt='/'></img>
                            <p>
                                Cotton Saree at minimal cost than you can even imagine.
                            </p>
                            <p>
                                INR 2,999
                            </p>
                        </div>
                        <div className='innerCard'>
                            <img src='' href alt='/'></img>
                            <p>
                                Cotton Saree at minimal cost than you can even imagine.
                            </p>
                            <p>
                                INR 2,999
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Cart