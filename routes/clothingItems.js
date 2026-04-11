const router = require("express").Router();
const auth = require("../middlewares/auth");
const { validateCardBody, validateId } = require("../middlewares/validation");

const {
  getItems,
  createClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.get("/", getItems);

router.use(auth);

router.post("/", validateCardBody, createClothingItem);
router.delete("/:itemId", validateId, deleteClothingItem);
router.put("/:itemId/likes", validateId, likeItem);
router.delete("/:itemId/likes", validateId, dislikeItem);

module.exports = router;
