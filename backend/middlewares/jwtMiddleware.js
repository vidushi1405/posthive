const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

async function verifyAccessToken(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "Access denied. Token missing." });
  }
  const token = authHeader.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_KEY_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    if (!user.isVerified) {
      return res.status(403).json({ error: "User is not verified. Please verify your account." });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
}

function verifyAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: "Access denied. Admin role required." });
    }
}

module.exports = { verifyAccessToken, verifyAdmin };