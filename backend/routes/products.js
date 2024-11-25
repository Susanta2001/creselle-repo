const express = require('express');
const multer = require('multer');
const { body, validationResult } = require('express-validator');
const Product = require('../models/Product');

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files in the uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
  },
});

const upload = multer({ storage });

// Route 1: Add products to the database with an image
router.post(
  '/',
  upload.single('image'), // Middleware to handle image upload
  [
    body('title', 'Title is required').notEmpty(),
    body('description', 'Description should be at least 10 characters long').isLength({ min: 10 }),
    body('price', 'Price must be a number').isNumeric(),
  ],
  async (req, res) => {
    // Validate incoming request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure fields from request body
    const { title, description, price, category } = req.body;

    try {
      // Check if an image file is uploaded
      if (!req.file) {
        return res.status(400).json({ error: 'Image file is required' });
      }

      // Create new product instance
      const newProduct = new Product({
        title,
        description,
        price,
        category,
        image: req.file.path, // Save the file path of the uploaded image
      });

      // Save product to the database
      const savedProduct = await newProduct.save();
      res.json({ success: true, product: savedProduct });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  }
);

// Route 2: Fetch all products from the database
router.get('/allProducts', async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();

    // If no products are found
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }

    // Send the products as a response
    res.json({ products });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Route 3: Fetch products by category
router.get('/category/:category', async (req, res) => {
  const { category } = req.params;

  try {
    const products = await Product.find({ category });

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for this category' });
    }

    res.json({ products });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
