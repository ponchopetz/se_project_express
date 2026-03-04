const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const handleControllerError = require("../utils/handleControllerError");

const handleAuthError = (res) => {
  res.status(401).send({ message: "Authorization required" });
};

const extractBearerToken = (header) => {
  return header.replace("Bearer ", "");
};

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;
  next();
};

module.exports = authMiddleware;
