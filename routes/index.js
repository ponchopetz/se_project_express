const router = require("express").Router();
const usersRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");
const { login, createUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

router.post("/signup", createUser);
router.post("/signin", login);

router.use("/items", clothingItemsRouter);

router.use(auth);

router.use("/users", usersRouter);

module.exports = router;
