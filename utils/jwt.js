const jwt = require("jsonwebtoken");
const jwt_secret = "travel";

const generatetoken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, jwt_secret, { expiresIn: "1h" });
};

const generateAdmintoken = (admin) => {
    return jwt.sign({ id: admin.id, email: admin.email }, jwt_secret, { expiresIn: "1h" }); // Fixed typo
};

module.exports = {
    generatetoken,
    generateAdmintoken,
    jwt_secret,
};
