import React, { useEffect, useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import {UserContext} from '../context/UserContext'
import { OrderContext } from "../context/OrderContext"; // Import OrderContext
import "../assets/css/BuyNow.css";


function OrderPage() {
  const { allCartProducts, getCartProducts } = useContext(CartContext);
  const { createOrder } = useContext(OrderContext); // Access createOrder from context
  const {user} = useContext(UserContext);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India", // Default country
    termsAccepted: false,
  });

  useEffect(() => {
    getCartProducts();
    // console.log(allCartProducts);
    console.log(user._id);
  }, []);

  // Calculate the order total
  const calculateOrderTotal = () => {
    return allCartProducts.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle order confirmation
  const handleConfirmOrder = async (e) => {
    e.preventDefault();
    const { name, address, phone, city, state, zipCode, country, termsAccepted } = formData;

    // Form validation
    if (!name || !address || !phone || !city || !state || !zipCode || !termsAccepted) {
      alert("Please fill all required fields and accept terms and conditions.");
      return;
    }

    // Prepare order data
    const orderData = {
      userId: user._id, // Replace with logged-in user's ID
      items: allCartProducts.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: calculateOrderTotal(),
      address: {
        name,
        address,
        phone,
        city,
        state,
        zipCode,
        country,
      },
    };

    try {
      const order = await createOrder(orderData); // Call createOrder API
      alert(`Order confirmed! Order ID: ${order._id}`);
    } catch (error) {
      console.error("Order confirmation failed:", error);
      alert("Failed to confirm the order. Please try again.");
    }
  };

  return (
    <>
      <div className="container mt-5 d-flex w-100 main-buy-now-container">
        <div className="container-left w-50 d-flex flex-column">
          <h1>Checkout</h1>
          <h5>Shipping Information</h5>
          <form className="d-flex flex-column" onSubmit={handleConfirmOrder}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
            />

            <label htmlFor="address">Address</label>
            <textarea
              rows="2"
              cols="40"
              id="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleInputChange}
            />

            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleInputChange}
            />

            <label htmlFor="country">Country</label>
            <select
              id="country"
              value={formData.country}
              onChange={handleInputChange}
            >
              <option value="India">India</option>
              <option value="Pakistan">Pakistan</option>
              <option value="Bangladesh">Bangladesh</option>
              <option value="Nepal">Nepal</option>
              <option value="Sri Lanka">Sri Lanka</option>
            </select>

            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              placeholder="City"
              value={formData.city}
              onChange={handleInputChange}
            />

            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              placeholder="State"
              value={formData.state}
              onChange={handleInputChange}
            />

            <label htmlFor="zipCode">Zip Code</label>
            <input
              type="text"
              id="zipCode"
              placeholder="Zip Code"
              value={formData.zipCode}
              onChange={handleInputChange}
            />

            <div className="terms-and-conditions">
              <input
                type="checkbox"
                id="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleInputChange}
              />
              <label htmlFor="termsAccepted">
                I have read the terms and conditions
              </label>
            </div>

            <button type="submit">Confirm Order</button>
          </form>
        </div>
        <div className="container-right w-50">
          <h4>Order Summary</h4>
          <p>Total: ₹{calculateOrderTotal()}</p>
          <div className="payment-options">
            <div className="g-pay">Pay using Google Pay</div>
            <div className="phone-pay">Pay using Phone Pay</div>
            <div className="paytm">Pay using Paytm</div>
            <div className="cod">Pay on delivery</div>
          </div>
          <input
            type="text"
            placeholder="Discount Code"
            className="p-2 d-code"
          />
        </div>
      </div>
    </>
  );
}

export default OrderPage;
