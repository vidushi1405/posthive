// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoute = require("./routes/auth_router");
const blogRoute = require("./routes/blog_router");
const jwtMiddleware = require("./middlewares/jwtMiddleware");

dotenv.config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.DB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoute);
app.use("/blogs", blogRoute); // Publicly accessible but with optional user

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
