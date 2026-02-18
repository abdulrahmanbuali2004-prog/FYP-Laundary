const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

const connectToDB = require("./config/db");

const userRoutes = require("./routes/user/userRoutes");
const orderRoutes = require("./routes/orders/orderRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/user", userRoutes);
app.use("/orders", orderRoutes);

// Health check route 
app.get("/", (req, res) => {
  res.send("Laundry API is running");
});

// Connect to database
connectToDB();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
