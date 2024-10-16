const connection = require("../config/db");
const { generateAdmintoken } = require('../utils/jwt'); // Update path

const login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const query = `SELECT * FROM admin WHERE email = ? AND password = ?`;
    connection.query(query, [email, password], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Login failed", error: err });
        }

        console.log('Query Result:', result); // Log to check retrieved admin data

        if (result.length === 0) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate a token after successful login
        const admin = result[0];
        const token = generateAdmintoken(admin); // Ensure admin has the correct structure

        res.status(200).json({
            message: "Admin login successful",
            token: token
        });
    });
};

module.exports = {
    login,
};
