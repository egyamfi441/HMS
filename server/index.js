// Load environment variables first
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./db"); // Import the db connection

// Debug logs to confirm env is working
console.log("DEBUG Stripe Secret Key:", process.env.STRIPE_SECRET_KEY || "❌ NOT FOUND");
console.log("DEBUG Stripe Publishable Key:", process.env.STRIPE_PUBLISHABLE_KEY || "❌ NOT FOUND");

// Require routes after dotenv is loaded
const patientRoutes = require("./routes/patients");
const doctorRoutes = require("./routes/doctors");
const appointmentRoutes = require("./routes/appointments");
const billingRoutes = require("./routes/billing");
const paymentRoutes = require("./routes/payments");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Use modular routes
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/billing", billingRoutes);
app.use("/api/payments", paymentRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

process.on("SIGINT", () => {
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Closed the database connection.");
    process.exit(0);
  });
});

