const User = require("../modal/user");
const bcrypt = require("bcryptjs");
const ApiError = require("../utils/ApiError");

exports.signup = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 12).then((hashedPassword) => {
    const user = new User({ name, email, password: hashedPassword });
    return user
      .save()
      .then((result) => {
        res
          .status(201)
          .json({ message: "User created successfully", userId: result._id });
      })
      .catch((err) => {
        const error = new ApiError("Failed to signup", 500, err.message);
        next(error);
      });
  });
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      return bcrypt.compare(password, user.password).then((result) => {
        if (!result) {
          const error = new ApiError("Invalid password", 401);
          return next(error);
        }
        res
          .status(200)
          .json({
            message: "Login successful",
            data: {
              accessToken: "1234567890",
              userId: user._id,
              name: user.name,
              email: user.email,
            },
          })
          .catch((err) => {
            const error = new ApiError("Failed to login", 500, err.message);
            next(error);
          });
      });
    })
    .catch((err) => {
      const error = new ApiError("Failed to login", 500, err.message);
      next(error);
    });
};
