const {
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  FORBIDDEN_ERROR,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED_ERROR,
  CONFLICT_ERROR,
} = require("./errors");

const handleControllerError = (res, err, messages = {}) => {
  console.error(err);

  if (err.name === "ValidationError") {
    res.status(BAD_REQUEST_ERROR).send({
      message: messages.validation || "Invalid data passed",
    });
    return;
  }

  if (err.name === "CastError") {
    res.status(BAD_REQUEST_ERROR).send({
      message: messages.cast || "Invalid ID",
    });
    return;
  }

  if (err.name === "DocumentNotFoundError") {
    res.status(NOT_FOUND_ERROR).send({
      message: messages.notFound || "Requested resource not found",
    });
    return;
  }

  if (err.name === "AuthError") {
    res.status(UNAUTHORIZED_ERROR).send({
      message: "Incorrect email or password",
    });
    return;
  }

  if (err.name === "ForbiddenError") {
    res.status(FORBIDDEN_ERROR).send({
      message: err.message,
    });
    return;
  }

  if (err.code === 11000) {
    res.status(CONFLICT_ERROR).send({
      message: messages.conflict || "User with this email already exists",
    });
    return;
  }

  res.status(INTERNAL_SERVER_ERROR).send({
    message: "An error has occurred on the server",
  });
};

module.exports = handleControllerError;
