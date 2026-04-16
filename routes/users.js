const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/users");
const validateUserBody = require("../middlewares/validateUserUpdate");

router.get("/me", getCurrentUser);
router.patch("/me", validateUserBody, updateUser);

module.exports = router;
