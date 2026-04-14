require("dotenv").config();
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const express = require("express");
const cors = require("cors");
const { errors } = require("celebrate");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { MONGO_URL = "mongodb://127.0.0.1:27017/wtwr_db" } = process.env;
const { PORT = 3001 } = process.env;

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later.",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);

app.use(express.json());

app.use(requestLogger);

//For testing purposes only, remove in production
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

// Routes
app.use("/", mainRouter);

app.use(errorLogger);
app.use(errors());

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
