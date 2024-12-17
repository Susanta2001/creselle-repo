import React, { useState, useEffect, useContext } from 'react';
import { OrderContext } from '../context/OrderContext';

function BuyNow() {
  const { createOrder } = useContext(OrderContext);
  const [address, setAddress] = useState('');
  const [cartItems, setCartItems] = useState([]); // Store cart items fetched from the backend
  const [totalAmount, setTotalAmount] = useState(0); // Store total amount calculated from cart

  // Fetch cart data when the component mounts
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const authToken = localStorage.getItem('token'); // Fetch the token from localStorage
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

  return (
    <div className="buy-now-div">
      <h2>Checkout</h2>
      <textarea
        name="address"
        id="address"
        placeholder="Enter your address"
        value={address}
        onChange={handleOnChange}
      ></textarea>
      <h3>Total Amount: ₹{totalAmount}</h3>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default BuyNow;
