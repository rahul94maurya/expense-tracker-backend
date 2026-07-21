const { body } = require("express-validator");
const User = require("../modal/user");

exports.loginValidator = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then((user) => {
        if (!user) {
          return Promise.reject("User does not exist");
        }
      });
    })
    .normalizeEmail(),
];
