const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Order = require('../models/Order');

// Route 1: Create a new order (Login required)
router.post('/create', fetchuser, async (req, res) => {
  const { items, totalAmount, address } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ success: false, error: 'Order items are required.' });
  }

  if (!totalAmount || totalAmount <= 0) {
    return res.status(400).json({ success: false, error: 'Total amount must be valid.' });
  }

  if (!address || address.trim() === '') {
    return res.status(400).json({ success: false, error: 'Delivery address is required.' });
  }

  try {
    const order = new Order({
      user: req.user.id,
      items,
      totalAmount,
      address,
    });

    await order.save();
    res.json({ success: true, order });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
});

// Route 2: Get all orders for the logged-in user (Login required)
router.get('/myorders', fetchuser, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
});

// Route 3: Get a specific order by ID (Login required)
router.get('/:id', fetchuser, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user.id });

    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    res.json({ success: true, order });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
});

// Route 4: Update the status of an order (Admin-only)
router.put('/update/:id', async (req, res) => {
  const { status } = req.body;

  if (!status || !['Pending', 'Shipped', 'Delivered', 'Cancelled'].includes(status)) {
    return res.status(400).json({ success: false, error: 'Invalid status.' });
  }

  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.json({ success: true, order });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
});
module.exports = router; 