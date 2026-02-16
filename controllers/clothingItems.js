const clothingItem = require("../models/clothingItem");
const handleControllerError = require("../utils/handleControllerError");

const getItems = (req, res) => {
  clothingItem
    .find({})
    .then((items) => res.send(items))
    .catch((err) => handleControllerError(res, err));
};

const getItem = (req, res) => {
  const { itemId } = req.params;

  clothingItem
    .findById(itemId)
    .orFail()
    .then((item) => res.send(item))
    .catch((err) =>
      handleControllerError(res, err, {
        notFound: "Item not found",
        cast: "Invalid item ID",
      })
    );
};

const createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  clothingItem
    .create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) =>
      handleControllerError(res, err, {
        validation: "Invalid data passed for creating an item",
      })
    );
};

const deleteClothingItem = (req, res) => {
  const { itemId } = req.params;

  clothingItem
    .findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.send(item))
    .catch((err) =>
      handleControllerError(res, err, {
        notFound: "Item not found",
        cast: "Invalid item ID",
      })
    );
};

const likeItem = (req, res) => {
  clothingItem
    .findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
      { new: true }
    )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) =>
      handleControllerError(res, err, {
        notFound: "Item not found",
        cast: "Invalid item ID",
      })
    );
};

const dislikeItem = (req, res) => {
  clothingItem
    .findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } }, // remove _id from the array
      { new: true }
    )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) =>
      handleControllerError(res, err, {
        notFound: "Item not found",
        cast: "Invalid item ID",
      })
    );
};

module.exports = {
  getItems,
  getItem,
  createClothingItem,
  likeItem,
  dislikeItem,
  deleteClothingItem,
};
