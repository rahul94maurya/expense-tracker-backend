exports.signupValidator = [
  body("username", "Username is required").notEmpty(),
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject("Email already in use");
        }
      });
    })
    .normalizeEmail(),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password and confirm password does not match");
    }
    return true;
  }),
];
