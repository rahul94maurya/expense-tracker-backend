const User = require("../modal/user");
const bcrypt = require("bcrypt");

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
        next(err);
      });
  });
};
