const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");
const { NOT_FOUND_ERROR } = require("./utils/errors");

const { MONGO_URL = "mongodb://127.0.0.1:27017/wtwr_db" } = process.env;

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
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch(console.error);

app.use("/", mainRouter);
app.use((req, res) => {
  res.status(NOT_FOUND_ERROR).send({ message: "Requested resource not found" });
});
