const router = require("express").Router();
const usersRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");
const { login, createUser } = require("../controllers/users");
const auth = require("../middlewares/auth");
const {
  validateUserBody,
  validateLogin,
} = require("../middlewares/validation");

router.post("/signup", validateUserBody, createUser);
router.post("/signin", validateLogin, login);

router.use("/items", clothingItemsRouter);

router.use(auth);

router.use("/users", usersRouter);

// 404 handler — catches any request that didn't match a defined route
router.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

module.exports = router;
