const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const userVerification = (req, res, next) => {
    const token = req.cookies && req.cookies.token;

    if (!token) {
        console.log("Token does not exist");
        return res.status(401).send({ error: "User unauthorized - Token missing" });
    } else {
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).send({ error: "User unauthorized - Token expired" });
                } else {
                    console.error("Error verifying token:", err);
                    return res.status(401).send({ error: "User unauthorized - Invalid token" });
                }
            } else {
                req.user = decoded;
                next();
            }
        });
    }
};

module.exports = userVerification;