const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../utils/jwt'); // Import the secret from jwt.js

const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, jwt_secret); // Use the imported secret here
        req.user = decoded; // assuming the decoded token contains user information
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = {
    authenticateUser,
};
