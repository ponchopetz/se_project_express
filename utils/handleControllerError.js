const {
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  INTERNAL_SERVER_ERROR,
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

  res.status(INTERNAL_SERVER_ERROR).send({
    message: "An error has occurred on the server",
  });
};

module.exports = handleControllerError;
