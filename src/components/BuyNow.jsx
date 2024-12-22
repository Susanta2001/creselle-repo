import React, { useState, useEffect, useContext } from 'react';
import { OrderContext } from '../context/OrderContext';
import { CartContext } from '../context/CartContext'
import '../assets/css/BuyNow.css'

function BuyNow() {
  const { createOrder } = useContext(OrderContext);
  const { allCartProducts } = useContext(CartContext);
  const [address, setAddress] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  let orderReference = allCartProducts._id;

  // Fetch cart data when the component mounts
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const authToken = localStorage.getItem('token');
        if (!authToken) {
          console.error('No auth-token found!');
          return;
        }

        const response = await fetch('http://localhost:5000/api/cart/allCartProducts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': authToken,
          },
        });

        const json = await response.json();
        if (response.ok) {
          setCartItems(json.cart.items || []);
          calculateTotalAmount(json.cart.items || []); // Calculate total amount
        } else {
          console.error('Error fetching cart:', json.message);
        }
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchCart();
  }, []);

  // Function to calculate the total amount based on cart items
  const calculateTotalAmount = (items) => {
    const total = items.reduce((sum, item) => sum + item.quantity * (item.product.price || 0), 0);
    setTotalAmount(total);
  };

  // Function to handle address input change
  const handleOnChange = (event) => {
    setAddress(event.target.value);
  };

  // Function to handle order submission
  const handleSubmit = async () => {
    try {
      if (!address.trim()) {
        alert('Please enter a valid address.');
        return;
      }

      const order = await createOrder({
        items: cartItems.map((item) => ({
          product: item.product._id, // Pass the product ID
          quantity: item.quantity,
          price: item.product.price, // Pass the price from the product
        })),
        totalAmount,
        address,
      });

      console.log('Order created:', order);
      alert('Order created successfully!');
    } catch (error) {
      console.error('Error creating order:', error.message);
      alert('Failed to create order. Please try again.');
    }
  };

  {/* <div className="">

  <h2>Pay to confirm order</h2>
      <textarea name="address" id="address" placeholder="Enter your address" value={address} onChange={handleOnChange}></textarea>
      <h3>Total Amount: ₹{totalAmount}</h3>
      <button onClick={handleSubmit}>Submit</button>
</div> */}

  return (
    <div className="buy-now-div px-4 d-flex " style={{ marginTop: '7rem' }}>
      <div className="address-div w-50 p-4">
        <p>Delivery Address</p>
        <form action="" className='d-flex flex-column'>
          <label htmlFor="name">Your Name</label>
          <input type="text" name='name' id='name' />

          <label htmlFor="phone">Your Contact Info</label>
          <input type="tel" name='phone' id='phone' />

          <label htmlFor="road-address">Road/Locality/Street Name</label>
          <input type="text" name='road-address' id='road-address' />

          <label htmlFor="care-address">Care of/Building Name</label>
          <input type="text" name='care-address' id='care-address' />

          <label htmlFor="area-address">Area</label>
          <input type="text" name='area-address' id='area-address' />

          <button className='mt-5 submit-btn'>Submit</button>
        </form>
      </div>
      <div className="order-info-div p-4 w-50">
        <p>Order Summary</p>
        <div className="order-status d-flex justify-content-around">
          <i className='bx order-box-icon bxs-cart-alt'></i>
          <i className='bx order-box-icon bxs-wallet-alt' ></i>
          <i className='bx order-box-icon bxs-home-alt-2'></i>
        </div>
        <p>Order reference: {orderReference} </p>
        <div className="pay-text-div d-flex justify-content-between">
          <p id='pay-text'>How would you like to pay?</p>
          <p>Total Amount: ₹{totalAmount}</p>
        </div>
        <div className="d-flex flex-column payment-options">
          <button onClick={handleSubmit}>Phone pay</button>
          <button onClick={handleSubmit}>Google pay</button>
          <button onClick={handleSubmit}>Cash on Delivery</button>
          <button onClick={handleSubmit}>Pay later</button>
        </div>
      </div>
    </div>
  );
}

export default BuyNow;
