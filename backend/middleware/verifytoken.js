const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Harryisagoodb$oy';

const verifyToken = (req, res, next) => {
    const token = req.header('auth-token'); // Directly get the token

    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    try {
        const verified = jwt.verify(token, JWT_SECRET); // Replace 'your-secret-key' with your actual JWT secret
        req.user = verified.user; // Attach user details to the request object
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = verifyToken;
