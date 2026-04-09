require("dotenv").config();
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");
const errorHandler = require("./middlewares/error-handler");

const { MONGO_URL = "mongodb://127.0.0.1:27017/wtwr_db" } = process.env;
const { PORT = 3001 } = process.env;

const app = express();

//Middlewares
app.use(helmet());
app.use(cors());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later.",
});
app.use(limiter);

app.use(express.json());

// Routes
app.use("/", mainRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

// Error handler
app.use(errorHandler);

// Connect to DB
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
