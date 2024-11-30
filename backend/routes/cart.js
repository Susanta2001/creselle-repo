const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifytoken');
const Cart = require('../models/Cart');

// Add product to cart
router.post('/add', verifyToken, async (req, res) => {
    const userId = req.user.id;  // This comes from the token
    const { productId, quantity } = req.body;

    // Validate inputs
    if (!productId || !quantity) {
        return res.status(400).json({ message: 'Product ID and quantity are required.' });
    }

    try {
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            // Cart is empty, so create a new one
            cart = new Cart({ user: userId, items: [] });
        }

        // Check if the product already exists in the cart
        const existingItem = cart.items.find((item) => item.product.toString() == productId);

        if (existingItem) {
            // Ensure that quantity is always treated as a number
            existingItem.quantity = Number(existingItem.quantity) + Number(quantity); // Make sure both are numbers
        } else {
            cart.items.push({ product: productId, quantity: Number(quantity) }); // Ensure new quantity is a number
        }

        await cart.save();
        res.status(200).json({ message: 'Product saved to cart' });
    } catch (error) {
        console.error('Failed to add product:', error); // Log the actual error
        res.status(500).json({ error: 'Failed to add product to cart' });
    }
});

module.exports = router;
