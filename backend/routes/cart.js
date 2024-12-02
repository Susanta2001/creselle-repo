const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifytoken');
const Cart = require('../models/Cart');

// ROUTE - 1 :Add product to cart
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


// ROUTE - 2 : FETCH ALL PRODUCTS BASED ON LOGIN 
router.get('/allCartProducts', verifyToken, async (req, res) => {
    const userId = req.user.id;

    try {
        // Find the user's cart
        const cartData = await Cart.findOne({ user: userId }).populate('items.product'); // Populating product details if needed

        if (!cartData) {
            return res.status(404).json({ message: 'No cart found for this user' });
        }

        // Check if the cart is empty
        if (cartData.items.length === 0) {
            return res.status(200).json({ cart: { items: [] } });
        }

        // Return the cart data
        res.status(200).json({ cart: cartData });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// ROUTE - 3 : Update product quantity in the cart
router.put('/updateQuantity', verifyToken, async (req, res) => {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (!productId || quantity === undefined) {
        return res.status(400).json({ message: 'Product ID and quantity are required.' });
    }

    try {
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found.' });
        }

        const item = cart.items.find((item) => item.product.toString() === productId);

        if (item) {
            item.quantity = quantity; // Update the quantity
            if (item.quantity <= 0) {
                // Remove the item if quantity is 0 or less
                cart.items = cart.items.filter((item) => item.product.toString() !== productId);
            }
        } else {
            return res.status(404).json({ message: 'Product not found in cart.' });
        }

        await cart.save();
        res.status(200).json({ message: 'Cart updated successfully.', cart });
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// ROUTE - 4 : Remove product from cart
router.delete('/removeProduct', verifyToken, async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.body;

    if (!productId) {
        return res.status(400).json({ message: 'Product ID is required.' });
    }

    try {
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found.' });
        }

        cart.items = cart.items.filter((item) => item.product.toString() !== productId);

        if (cart.items.length === 0) {
            await Cart.deleteOne({ user: userId }); // Optional: Delete cart if empty
        } else {
            await cart.save();
        }
        res.status(200).json({ message: 'Product removed from cart.', cart });
    } catch (error) {
        console.error('Error removing product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
