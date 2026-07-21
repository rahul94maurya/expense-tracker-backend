const express = require("express");
const { signupValidator } = require("../validators/signup.validator");
const { validate } = require("../validators/validate");
const authController = require("../controller/auth");
const { loginValidator } = require("../validators/login.validator");
const router = express.Router();

router.post("/signup", signupValidator, validate, authController.signup);
router.post("/login", loginValidator, validate, authController.login);

module.exports = router;
