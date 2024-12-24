import React, { useState } from 'react';


const BuyNow = () => {
  const [amount, setAmount] = useState(500); // Example amount (in INR)

  const handlePayment = async () => {
    try {
      // Step 1: Create an order in the backend
      const response = await fetch('http://localhost:5000/api/order/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const { orderId, currency } = await response.json();

      // Step 2: Open Razorpay Checkout
      const options = {
        key: 'rzp_test_CBzEZCN0hbg5qZ', // Replace with your Razorpay key ID
        amount: amount * 100, // Amount in paise
        currency: currency || 'INR',
        name: 'Your Company Name',
        description: 'Test Transaction',
        order_id: orderId, // Razorpay order ID
        handler: async function (response) {
          // Step 3: Payment was successful, verify it in the backend
          console.log('Payment Success:', response);

          const verifyResponse = await fetch(
            `http://localhost:5000/api/order/verify-payment`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            }
          );

          if (!verifyResponse.ok) {
            alert('Payment verification failed');
          } else {
            alert('Payment successful and verified!');
          }
        },
        prefill: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
      };

      // eslint-disable-next-line no-undef
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error during payment:', error);
    }
  };

  return (
    <div>
      <h1>Online Payment via Razorpay</h1>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter Amount"
      />
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default BuyNow;
