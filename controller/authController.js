const connection = require("../config/db"); 
const jwt = require('jsonwebtoken');
const { generatetoken } = require('../utils/jwt'); 

const signup = (req, res) => {
    const {email, password,phoneno,name,travelhistory } = req.body;

    if (!email || !password||!name||!password||!phoneno||!travelhistory) {
        return res.status(400).json("All fields are required are required");
    }

    const query = `INSERT INTO user(email, password,phoneno,name,travelhistory) VALUES (?,?,?,?,?)`;
    connection.query(query, [email, password,phoneno,name,travelhistory], (err, result) => {
        if (err) {
            return res.status(500).json("Server Error 500");
        } else {
            const User = {
                id: result.insertId,
                email: email,
            };

            const token = generatetoken(User); 

            // Respond with the token and success message
            return res.status(200).json({
                message: "User has successfully signed up",
                token: token 
            });
        }   
    });
};
const login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const query = `SELECT * FROM user WHERE email = ? AND password = ?`;
    connection.query(query, [email, password], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Login failed", error: err });
        }

        if (result.length === 0) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        res.status(200).json({ message: "Login successful" });
    });
};

module.exports = {
    signup, 
    login
};