const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const isEmail = require("validator/lib/isEmail");
const isUrl = require("validator/lib/isURL");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "Jacques Cousteau",
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    default:
      "https://practicum-content.s3.us-west-1.amazonaws.com/resources/avatar_1604080799.jpg",
    validate: {
      validator: (v) => isUrl(v),
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => isEmail(v),
      message: "You must enter a valid email address",
    },
  },
  password: { type: String, required: true, select: false },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(
          Object.assign(new Error("Incorrect email or password"), {
            name: "AuthError",
          })
        );
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            Object.assign(new Error("Incorrect email or password"), {
              name: "AuthError",
            })
          );
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
