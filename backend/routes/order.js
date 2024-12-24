const express = require('express');
const Razorpay = require('razorpay');
const router = express.Router();
const Order = require('../models/Order');

const razorpay = new Razorpay({
  key_id: 'rzp_test_CBzEZCN0hbg5qZ',
  key_secret: 'Rm23DEgJN9HusbicQlEck30E',
});

// Route: Create an order for online payment
router.post('/create-order', async (req, res) => {
  const { amount, currency } = req.body;

  const options = {
    amount: amount * 100, // Razorpay requires the amount in paise
    currency: currency || 'INR',
    receipt: `receipt_${Date.now()}`,
    payment_capture: 1, // Auto-capture the payment
  };

  try {
    const order = await razorpay.orders.create(options);

    // Save the order details in your database
    const newOrder = new Order({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      status: 'created',
    });
    await newOrder.save();

    res.status(201).json({
      success: true,
      orderId: order.id,
      currency: order.currency,
      amount: order.amount,
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

router.post('/verify-payment', async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  
    const crypto = require('crypto');
    const hmac = crypto.createHmac('sha256', 'Rm23DEgJN9HusbicQlEck30E'); // Your Razorpay key secret
  
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest('hex');
  
    if (generatedSignature === razorpay_signature) {
      res.status(200).json({ success: true, message: 'Payment verified successfully' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }
  });
  

module.exports = router;
