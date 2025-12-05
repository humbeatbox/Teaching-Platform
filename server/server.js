const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const authRoute = require("./routes").auth;
const CourseRoute = require("./routes").course;

const passport = require("passport");
require("./config/passport")(passport); //will call the function in passport.js

const cors = require("cors");
const helmet = require("helmet");

// Connect to DB
mongoose
  .connect(process.env.MONGODB_CONNECTION)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Failed to connect to DB");
    console.log(err);
  });

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet()); // Add security headers

// Route Middlewares
app.use("/api/user", authRoute);

//course route should be protected if not authenticated(without token)
app.use(
  "/api/courses",
  (req, res, next) => {
    console.log("course route is linking...");
    next();
  },
  passport.authenticate("jwt", { session: false }),
  CourseRoute
);

//for use the config in react(set the environment variable)
app.get("/api/config", (req, res) => {
  res.json({ apiUrl: process.env.API_URL });
});

// Health check endpoints for Kubernetes
// Liveness probe - checks if the application is running
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Readiness probe - checks if the application is ready to serve traffic
app.get("/ready", async (req, res) => {
  try {
    // Check MongoDB connection state
    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    const dbState = mongoose.connection.readyState;

    if (dbState !== 1) {
      return res.status(503).json({
        status: "not ready",
        reason: "database not connected",
        dbState: dbState,
        timestamp: new Date().toISOString(),
      });
    }

    res.status(200).json({
      status: "ready",
      database: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(503).json({
      status: "not ready",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Serve static assets for react in production
const path = require("path");
app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check available at http://localhost:${PORT}/health`);
  console.log(`Readiness check available at http://localhost:${PORT}/ready`);
});

// Graceful shutdown handler
const gracefulShutdown = async (signal) => {
  console.log(`\n${signal} received. Starting graceful shutdown...`);

  // Stop accepting new connections
  server.close(async () => {
    console.log('HTTP server closed');

    try {
      // Close database connection
      await mongoose.connection.close();
      console.log('MongoDB connection closed');

      console.log('Graceful shutdown completed');
      process.exit(0);
    } catch (error) {
      console.error('Error during shutdown:', error);
      process.exit(1);
    }
  });

  // Force shutdown after timeout (10 seconds)
  setTimeout(() => {
    console.error('Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
};

// Listen for shutdown signals
// SIGTERM: Kubernetes sends this when terminating a pod
// SIGINT: Ctrl+C in terminal
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
