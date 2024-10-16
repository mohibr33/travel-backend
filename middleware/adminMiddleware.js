const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../utils/jwt'); // Adjust the path if necessary

// Middleware to verify admin token
const verifyAdminToken = (req, res, next) => {
    // Correctly extract the token from the 'Authorization' header
    const token = req.headers['authorization']?.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, jwt_secret); // Verify the token

        // Check if the decoded token has the necessary properties
        if (!decoded || !decoded.email) {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        req.admin = decoded; // Store admin info in the request object for further use
        next();
    } catch (error) {
        console.error('Token Verification Error:', error); // Log error details
        res.status(401).json({ message: "Invalid token." });
    }
};

module.exports = verifyAdminToken;
