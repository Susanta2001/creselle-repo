import React, { useState } from 'react'
import '../assets/css/AddToCart.css'
function Cart() {

    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState(1000);


    // function to handle quantity increment and decrement
    const handleIncrement = () => {
        setQuantity(quantity + 1);
        setTotal(total + 1000);
    }
    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1); //when quantity is more than 0
            setTotal(total - 1000);
        }
    }


    return (
        <>
            <div>
                <h2>YOUR CART</h2>
            </div>
            <div className='p-4'>
                <div className='prod-headers d-flex align-items-center' style={{ backgroundColor: '#C7B8B8' }}>
                    <p className='prod'>PRODUCT</p>
                    <p className='pri'>PRICE</p>
                    <p className='quan'>QUANTITY</p>
                    <p className='subt'>SUBTOTAL</p>
                </div>
                <div className='prod-main py-3' style={{ backgroundColor: '#d9d9d9' }}>
                    <div className='prod-main-inner d-flex p-2' style={{ borderBottom: '1px solid black' }}>
                        {/* this is for the first div */}
                        <div className='prod-inner-div d-flex justify-content-center align-items-center' id='prod-div-inner-one' style={{ width: '40%', borderRight: '1px solid black' }}>
                            <img src='' alt="..." />
                            <p id='prod-title' className='mx-2'>YELLOW SAREE</p>
                        </div>
                        {/* this is for the second div */}
                        <div className='prod-inner-div d-flex justify-content-center align-items-center' id='prod-div-inner-two' style={{ width: '20%', borderRight: '1px solid black' }}>
                            <p id='prod-price'>INR 2.999</p>
                        </div>
                        {/* this is for the third div */}
                        <div className='prod-inner-div d-flex justify-content-center align-items-center' id='prod-div-inner-three' style={{ borderRight: '1px solid black' }}>
                            <i class='bx bxs-trash'></i>
                            <div className='item-quantity d-flex justify-content-between'>
                                <p onClick={handleDecrement}>-</p>
                                <p>{quantity}</p>
                                <p onClick={handleIncrement}>+</p>
                            </div>
                        </div>
                        {/* this is for the fourth div */}
                        <div className='prod-inner-div d-flex justify-content-center align-items-center' id='prod-div-inner-four' style={{ width: '20%'}}>
                            <p id='price-total' style={{ margin: 'auto' }}>{total}</p>
                        </div>
                    </div>
                </div>
                {/* this is for price details */}
                <h5 style={{ display: 'block', color: '#295719', backgroundColor: '#d9d9d9',margin:'0',paddingBottom:'25px',paddingLeft:'15px'}}>Price Details:</h5>
                <div className='item-total-inner d-flex' style={{ backgroundColor: '#d9d9d9' }}>
                    
                    <div className='item-total-left' style={{ width: '60%' }}>
                        <p style={{paddingLeft:'15px',borderBottom:'1px solid black'}}>Delivery Charges:</p>
                        <p style={{paddingLeft:'15px',borderBottom:'1px solid black'}}>Shipping Charges:</p>
                        <h4 style={{paddingLeft:'15px'}}>Order Total :</h4>
                    </div>
                    <div className='item-total-mid' style={{ width: '20%', borderRight: '1px solid black' }}>
                        <p style={{ color: '#295719',borderBottom:'1px solid black' }}>FREE DELIVERY</p>
                        <p style={{ color: '#295719',borderBottom:'1px solid black' }}>199</p>
                        <p style={{ color: '#295719'}}>4,800</p>
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