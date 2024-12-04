const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Creating a secret for signing and verifying web tokens
const JWT_SECRET = 'Harryisagoodb$oy';

// Temporary storage for email verification
const pendingVerifications = {};

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'susantabiswas8116@gmail.com',
    pass: 'twvf ezvr cabe ihkq',
  },
});

// Route -1: No login required. Send verification email
router.post(
  '/verify-email',
  [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // Check if the user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ success: false, error: 'User with this email already exists' });
      }

      // Generate a verification code
      const verificationCode = crypto.randomBytes(3).toString('hex').toUpperCase(); // Example: "A1B2C3"

      // Store user details temporarily
      pendingVerifications[email] = {
        name,
        email,
        password: await bcrypt.hash(password, 10), // Hash the password
        verificationCode,
        expiresAt: Date.now() + 300000, // Code valid for 5 minutes
      };

      // Send the verification code via email
      await transporter.sendMail({
        from: 'susantabiswas8116@gmail.com',
        to: email,
        subject: 'Verify Your Email',
        text: `Your verification code is: ${verificationCode}. This code is valid for 5 minutes.`,
      });

      res.json({ success: true, message: 'Verification code sent to your email' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal server error');
    }
  }
);

// Route -2: No login required. Verify the email and create the user
router.post('/createuser', async (req, res) => {
  const { email, code } = req.body;

  const pendingUser = pendingVerifications[email];
  if (!pendingUser) {
    return res.status(400).json({ success: false, error: 'No verification request found for this email' });
  }

  if (pendingUser.expiresAt < Date.now()) {
    delete pendingVerifications[email];
    return res.status(400).json({ success: false, error: 'Verification code has expired' });
  }

  if (pendingUser.verificationCode !== code) {
    return res.status(400).json({ success: false, error: 'Invalid verification code' });
  }

  try {
    // Create a new user
    const user = await User.create({
      name: pendingUser.name,
      email: pendingUser.email,
      password: pendingUser.password,
    });

    // Clear the temporary storage
    delete pendingVerifications[email];

    // Sign the token
    const data = {
      user: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, JWT_SECRET);

    res.json({ success: true, authToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
});

// Route -3: No login required. Login user
router.post(
  '/login',
  [
    body('email', 'Enter a valid email').isEmail(),
    body('password', "Password can't be blank").exists(),
  ],
  async (req, res) => {
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success, error: 'Please use correct credentials to login' });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ success, error: 'Please use correct credentials to login' });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal server error');
    }
  }
);

// Route -4: Login required. Get logged in user details
router.get('/getuser', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
