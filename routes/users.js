const router = require("express").Router();
const { NOT_FOUND_ERROR } = require("../utils/errors");
const { getUsers, getUser, createUser } = require("../controllers/users");

router.get("/", getUsers);
router.get("/:userId", getUser);
router.post("/", createUser);
router.use((req, res) => {
  res
    .status(NOT_FOUND_ERROR)
    .send({ message: "Requested resource not found" });
});

module.exports = router;
