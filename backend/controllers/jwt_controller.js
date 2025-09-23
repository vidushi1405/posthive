const jwt = require('jsonwebtoken');
require("dotenv").config();
const accessTokenSecret = process.env.ACCESS_KEY_SECRET;

const jwtController = {
    signAccessToken: (user) => {
        const payload = { 
            id: user._id,
            email: user.email };
        return jwt.sign(payload, accessTokenSecret, { expiresIn: '15d' });
    }
};

module.exports = jwtController;