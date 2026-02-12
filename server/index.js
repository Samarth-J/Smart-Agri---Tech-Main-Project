require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const authRoutes = require("./Routes/user.js");
const connectDB = require("./config/db");

const app = express();

// Security HTTP headers - Disable CSP since pages are served by Flask
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP - pages served by Flask
  crossOriginEmbedderPolicy: false
}));

// Request logging
app.use(morgan("combined"));

// Rate limiting - General API protection
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/", limiter);

// Stricter rate limit for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per 15 minutes
  message: "Too many authentication attempts, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

// CORS - restrict to specific origins
const allowedOrigins = [
  "http://127.0.0.1:5000",
  "http://localhost:5000",
  "http://127.0.0.1:5500",
  "http://localhost:5500"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = "The CORS policy for this site does not allow access from the specified origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" })); // Limit payload size
app.use(cookieParser());

// Connect to MongoDB
connectDB();

// Mount auth routes with rate limiting
app.use("/api/auth", authLimiter, authRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  // Don't leak error details in production
  const isDev = process.env.NODE_ENV === "development";
  res.status(err.status || 500).json({ 
    message: isDev ? err.message : "Server Error",
    ...(isDev && { stack: err.stack })
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

