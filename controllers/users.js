const User = require("../models/user");
const handleControllerError = require("../utils/handleControllerError");

const getUsers = (req, res) =>
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => handleControllerError(res, err));

const getUser = (req, res) => {
  const { userId } = req.params;

  return User.findById(userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) =>
      handleControllerError(res, err, {
        notFound: "User not found",
        cast: "Invalid ID",
      })
    );
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  return User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) =>
      handleControllerError(res, err, {
        validation: "Invalid data",
      })
    );
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
