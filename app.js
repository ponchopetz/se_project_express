const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");
const { NOT_FOUND_ERROR } = require("./utils/errors");

const app = express();
const { PORT = 3001 } = process.env;
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "6993691d504a5e4e420363b6",
  };
  next();
});

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use("/", mainRouter);
app.use((req, res) => {
  res
    .status(NOT_FOUND_ERROR)
    .send({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
