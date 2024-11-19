const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Product = require('../models/Product');

// Route 1: Add products to the database
router.post(
  '/', 
  [
    body('title', 'Title is required').notEmpty(),
    body('description', 'Description should be at least 10 characters long').isLength({ min: 10 }),
    body('price', 'Price must be a number').isNumeric()
  ], 
  async (req, res) => {
    // Validate incoming request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure fields from request body
    const { title, description, price } = req.body;

    try {
      // Create new product instance
      const newProduct = new Product({
        title,
        description,
        price
      });

      // Save product to the database
      const savedProduct = await newProduct.save();
      res.json({ success: true, product: savedProduct });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
