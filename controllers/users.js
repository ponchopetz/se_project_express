const user = require("../models/user");
const handleControllerError = require("../utils/handleControllerError");

const getUsers = (req, res) => {
  user
    .find({})
    .then((users) => res.send(users))
    .catch((err) => handleControllerError(res, err));
};

const getUser = (req, res) => {
  const { userId } = req.params;

  user
    .findById(userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) =>
      handleControllerError(res, err, {
        notFound: "User not found",
        cast: "Invalid user ID",
      })
    );
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  user
    .create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) =>
      handleControllerError(res, err, {
        validation: "Invalid data passed for creating a user",
      })
    );
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
