const router = require("express").Router();
const { NOT_FOUND_ERROR } = require("../utils/errors");
const {
  getItems,
  getItem,
  createClothingItem,
  likeItem,
  dislikeItem,
  deleteClothingItem,
} = require("../controllers/clothingItems");

router.get("/", getItems);
router.get("/:itemId", getItem);
router.post("/", createClothingItem);
router.delete("/:itemId", deleteClothingItem);
router.put("/:itemId/likes", likeItem);
router.delete("/:itemId/likes", dislikeItem);
router.use((req, res) => {
  res.status(NOT_FOUND_ERROR).send({ message: "Requested resource not found" });
});

module.exports = router;
