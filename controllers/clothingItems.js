const ClothingItem = require("../models/clothingItem");
const handleControllerError = require("../utils/handleControllerError");

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch((err) => handleControllerError(res, err));
};

const getItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
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

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) =>
      handleControllerError(res, err, {
        validation: "Invalid data",
      })
    );
};

const deleteClothingItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.send(item))
    .catch((err) =>
      handleControllerError(res, err, {
        notFound: "Item not found",
        cast: "Invalid ID",
      })
    );
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true }
  )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) =>
      handleControllerError(res, err, {
        notFound: "Item not found",
        cast: "Invalid ID",
      })
    );
};

const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true }
  )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) =>
      handleControllerError(res, err, {
        notFound: "Item not found",
        cast: "Invalid ID",
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
