const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");
const { NOT_FOUND_ERROR } = require("./utils/errors");

const { MONGO_URL = "mongodb://127.0.0.1:27017/wtwr_db" } = process.env;
const { PORT = 3001 } = process.env;

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/", mainRouter);

// 404 handler
app.use((req, res) => {
  res.status(NOT_FOUND_ERROR).send({ message: "Requested resource not found" });
});

// Connect to DB
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
